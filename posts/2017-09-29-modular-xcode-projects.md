---
layout: post
title: Modular Xcode projects
excerpt: This post presents some elementary concepts of how Xcode projects are structured, and introduces an structural approach to build modular Xcode apps.
tags: [xcodeproj, swift, xcode, xcodembed]
---

Building modular projects with Xcode requires a good understanding of the project structure and its foundational concepts. The project structure is something that we don't usually care much about unless we start growing the project by adding more dependencies. Even in that case, most of the projects use [CocoaPods](https://cocoapods.org) that does the setup for us, or [Carthage](https://github.com/carthage) that doesn't do the setup, but makes it as easy as just adding a couple of changes in your project build phases. When the configuration becomes more complicated, it's very likely that we get confused because we didn't fully grasp all the elements that are involved in Xcode projects. I usually get asked questions like:

- Can I have Carthage, Cocoapods and my dependencies?
- I added my dependency but when the simulator opens the app crashes.
- Why do I have to embed the frameworks in some targets only?
- Should my framework be static, or dynamic?

In this blog post, I'd like to guide you through the Xcode projects elements, and the principles to modularize your setup by leveraging them. I hope that the next time you face any of those issues, you don't need to spend a lot of time on Stack Overflow trying to find a non-random response.

# Elements ⚒

## Target

Projects are made of smaller units called targets. Targets include the necessary configuration to build platform products such as frameworks, libraries, apps, testing bundles, extensions. You can see all the available types of target [here](https://github.com/xcodeswift/xcproj/blob/master/Sources/xcproj/PBXProductType.swift). Targets can depend on each other. When a target depends on another, that target is built first to use its product from the dependent target. The target configuration is defined in the following places:

- **Info.plist file:** This file contains product specific settings like the version, the name of the app or the type of app. You can read more about this file [here](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)
- **Entitlements:** It specifies the application capabilities. If the capabilities in the entitlement file mismatch the ones in the developer portal, the signing process fails.
- **Build settings:** As its name says, those are settings necessary to build the target. Build settings can be defined in the target itself, or in a `xcconfig` file. The configuration of a target is inherited being the first parent the config file _(if any)_, then the target configuration, and in the last place the project configuration.
- **Build phases:** The build pipeline is defined using build phases. When a target gets created, it contains the default build phases _(building source code, copying resources)_ but you can add as much as you want. As an example, there’s a shell script phase that allows you to do some scripting as part of the build process. Those scripts have access to the [build variables]() that are exposed from Xcode.

Due to the composability and reusability of `.xcconfig` files, it's very recommended that you define the build settings in those files. Changes in the target configuration such as changes in the build settings, or build phases are reflected in the `.pbxproj` file, a custom-plist representation of your project that is a common source of conflicts when we work with Git in our projects. The easiest way to update the configuration in the `pbxproj` file is using Xcode, which knows how to read and write changes to those files. If for any reason, you were interested in updating those files without using Xcode, you could use tools like Xcodeproj for [Ruby](https://github.com/cocoapods/xcodeproj) or [Swift](https://github.com/swift-xcode/xcodeproj)

> I hope that Apple makes the definition of the projects more accessible by either using a different definition syntax or opening APIs. This lack of accessibility led me to write a tool like [xcodeproj](https://github.com/swift-xcode/xcodeproj) to read and update your Xcode projects in Swift.

The output of building the targets are either **bundles** such as apps, extensions, or tests that are loaded on the platform they were built for, or **intermediate products** such as libraries or frameworks that encapsulate code and resources to be used for other targets. The products that are generated as a result of building a target can be seen in the group `Products` of your target. A red color in these files references indicates that there's no product, most likely because you haven't built the target before.

## Scheme

Another element of Xcode projects is schemes. A project can have multiple of them, and they can be shared and included as part of the project to be used by the people working on the project. Schemes specify the configuration for each of the available actions in Xcode: **run, test, profile, analyze and archive**. We can specify which targets are built, in which order, and for which actions. We can also define the tests that will be run when we test that scheme and the configuration that is used for each of the actions.

It's worth mentioning a few things about the build config of the scheme. When we specify which targets are built for which action, we don't need to include the dependencies of our target in the following two cases:

- If the dependency is part of the same project and is already defined in the `Target dependencies` build phases.
- `Find implicit dependencies` is enabled.

By enabling the second flag, the build process should identify the dependencies of the targets that you are building and build them first. Moreover, if you enable `Parallelize build`, you'll save some time since targets that don't depend on each other will be built in parallel.

A bad build config might eventually lead to errors building your targets such as `Framework XXX not found`. If you ever encounter one of those, check if all the dependencies of your target are getting built when you build the scheme.

The scheme definition is stored in a xml file under `Project.xcodeproj/xcshareddata/xcodeproj.xcscheme`. In this case the format is plain xml and can be easily modified with any xml editor.

## Workspace

Multiple projects can be grouped in a workspace. When projects are added to a workspace:

- Their schemes are listed in the workspace list of schemes.
- Projects can depend on each other as we'll see later.

As with schemes, workspaces are plain xml files that can be easily modified.

<p align="center">
  <img src="/images/posts/modular-workspace.png" width="350px" />
</p>

# Dependencies 🌱

Targets can have dependencies. Dependencies are frameworks or libraries that our targets link against, and that include source code and resources to be shared with our target. Those dependencies can be linked static or dynamically:

- **Static linking:**
  - The linking happens when the app gets compiled.
  - The object file code from the library gets included into the application binary _(larger application binary size)_.
  - Libraries use the file extension ".a", which comes from the (ar)chive file type.
  - If the same library gets linked more than once, the compiler fails because of duplicated symbols.
- **Dynamic linking:**
  - Modules are loaded at launch or runtime of an application.
  - Application and extension targets can share the same dynamic library _(only copied once)_.

The difference between a framework and a library _(linked static or dynamically)_ is that frameworks can contain multiple versions in the same bundle, and also additional assets that can be used by the code.

> A library is a _.a_ file which comes from the (ar)chive file type. A single archive file can only support a single architecture. If more than one architecture needs to be packaged, they can be bundled in a **fat Mach-O binary**, a simple container format that can house multiple files of different architectures. If we would like to generate a fat Mach-O binary, modify an existing one, or extract a library based on a specific architecture, we can use a command line tool called `lipo`.

You can read more about frameworks/libraries and static/dynamic on the [following link](https://pewpewthespells.com/blog/static_and_dynamic_libraries.html).

<p align="center">
  <img src="/images/posts/modular-linking.png" width="500px" />
</p>

Applications can depend on **precompiled** and **not-compiled** dependencies.

### Precompiled dependencies

[Carthage](https://github.com/carthage) is a good example of this kind of dependencies. Some SDKs are also distributed as compiled dependencies, like [Firebase](https://github.com/CocoaPods/Specs/blob/master/Specs/0/3/5/Firebase/4.2.0/Firebase.podspec.json#L23). When precompiled dependencies are libraries, they include the `.a` library and the public headers that represent the public interface of the library. When they are frameworks, they are distributed as a `.framework` that contains the library and resources.

<br />

When our app depends on precompiled dependencies it's important that the dependency is built for the architecture we are building our app for. If any of the architectures is missing, we'll get compilation errors trying to compile our apps. As we'll see later, Carthage uses lipo to generate frameworks that contain the necessary architectures for the simulator and the device, stripping the ones that are not necessary based on the build configuration.

### Non-compiled dependencies

[CocoaPods](https://cocoapods.org) is a good example here. Dependencies are defined in targets that compile the frameworks/libraries that we link against. There are multiple ways to specify in Xcode that our target depends on other target's products:

- **If the targets are in the same project:** You can define the dependency in the build phase _Target dependencies_. Xcode will automatically build that dependency first to use its products for the target that we are building.
- **If the targets are in different projects:** We can define the dependencies between the targets using _Schemes_. In the scheme Build section, we can define the targets that are built and in which order _(based on the dependencies between them)_. Xcode is able to guess the dependencies if you enable the flag _Find implicit dependencies_. It's able to make a guess, by understanding what the target that you are building depends on, and who builds that product. If there is anything missconfiguration in the scheme, you might get an error like `xxxx.framework not found`. You might also get that error if you have circular dependencies between the frameworks that cannot be resolved.

> **A note on dependencies and configurations:** The configurations of all the dependencies should match. If you are building your app with the Alpha configuration and any of the dependencies doesn't have that configuration, the compilation will fail with a framework not found error. When that happens, Xcode doesn't compile the framework but doesn't throw any error.

<p align="center">
  <img src="/images/posts/modular-dependencies.png" width="400px" />
</p>

## Linking with Xcode

Targets can link against other targets outputs, and we can define the dependencies using Xcode tools like schemes, or target dependencies, but... how can we glue the dependencies defining the links between them?

### 1. Linking (static or dynamic) libraries and frameworks

We can define the linking via:

- **A build phase:** Among all the available build phases, there's one for defining the linking, _Link Binary With Libraries_. You can add there the dependencies of your target, that can be part of the same project, or from another project in the same workspace. This build phase is used by Xcode to figure out the dependencies of your target when the target is getting built.
- **Compiler build setting:** A build phase turns the list into compiler flags underneath. That's something we can also do by defining some build settings:
  - `FRAMEWORK_SEARCH_PATHS`: We define in this setting the paths where the compiler can find the frameworks that we are linking against.
  - `LIBRARY_SEARCH_PATHS`: Similarly, we specify in this setting the paths where the compiler can find the libraries that we are linking against.
  - `OTHER_LDFLAGS` _(Other Linker Flags)_: We can specify the libraries we are linking against by using the `-l` argument: `-l"1PasswordExtension" -l"Adjust"`. If we are linking against a framework, we use the `-framework` argument instead: `-framework "GoogleSignIn" -framework "HockeySDK"`. If we try to link against a framework/library that cannot be found in the defined paths, the compilation will fail.

### 2. Exposing library headers

Libraries headers need to be exposed to the target that depends on the library. To do that, there's a build setting, `HEADER_SEARCH_PATHS` where we can define the paths where the headers of the dependencies can be found. If we link a library but forget about exposing their headers, the compilation will fail because it won't be able to find its headers.

### 3. Embedding frameworks into the products

App targets that link against dynamic framework need to copy those dependencies into the application bundle. This process is known as framework embedding. To do that we can use a Xcode **Copy Files Phase**, copying the frameworks to the `Frameworks` directory. Not only direct dependencies should be embedded, but also dependencies of our direct dependencies. If we miss any framework, the simulator will throw an error when we try to open the app.

---

# Cases of study 👨‍💻

In this section, we'll analyze how tools like CocoaPods and Carthage leverage the concepts introduced above to manage your project dependencies.

## CocoaPods

<p align="center">
  <img
    src="https://cocoapods.org/favicons/apple-touch-icon-144x144.png"
    width="100px"
  />
</p>

CocoaPods resolves your project dependencies and integrates them into your project. It's been very criticised for modifying your project settings, but they improved a lot since the early versions, and they do it in such a way that it doesn't require many changes in your project. What does it do under the hood?

- It creates a project _(`Pods.xcodeproj`)_ that contains all the dependencies as targets. Each of those targets compiles the dependency that needs to be linked from the app.
- It adds an extra target that depends on the other targets. It's an umbrella target that is used to trigger the compilation of the other targets. It does it to minimize the changes that are required in your project. By linking your app against that target, Xcode will compile all its dependencies first, and then your app.
- It creates a workspace with your project and the Pods project.
- Frameworks/libraries are linked using `.xcconfig` files that are added to your project group and set as configurations of your project targets.
- Embedding is done using a build phase script. Similarly, they copy all the frameworks resources using a build phase.

The image below illustrates how the setup looks like:

<br />

<p align="center">
  <img src="/images/posts/modular-cocoapods.png" width="300px" />
</p>

## Carthage

<p align="center">
  <img
    src="https://avatars2.githubusercontent.com/u/9146792?v=4&s=280"
    width="100px"
  />
</p>

Carthage approach is pretty different. Besides the resolution of dependencies, that in this case it's decentralized, the tool generates pre-compiled frameworks that the developer needs to link and embed from its app:

- Carthage resolves the dependencies and compiles them to generate dynamic frameworks that you can link from the app and their symbols for debugging purposes. These frameworks are fat frameworks, supporting both the simulator and device architectures.
- The frameworks are manually linked by the user using the _Link Binary With Libraries_ build phase.
- The embedding is done using a script that Carthage provides. The script strips those architectures that are not necessary for the destination that we are building for.
- The same script copies the symbols to the proper folder to make them debuggable.

<p align="center">
  <img src="/images/posts/modular-carthage.png" width="300px" />
</p>

---

I hope you found this post very insightful and that you could find answers to any doubt that you might have had. I'm not an expert on Xcode so you should expect some mistakes in the post. If you find any, please, don't hesitate to report it to me. Xcode has good and bad things, like any other IDE, but having a better understanding of its elements will help you get the best out of it. Don't be afraid of changing the setup and playing with schemes, targets, configurations. If you find yourself lost, I left a bunch of references in the section below. I recommend you to also use CocoaPods and Carthage as a reference and learn from them because they already spent a lot of time getting to know Xcode better to provide you with excellent tools for your projects.

Please, drop me a line [pedropb@hey.com](mailto://pedropb@hey.com) with any question, concern or doubt you have.

# References

- [Framework vs Library](http://www.knowstack.com/framework-vs-library-cocoa-ios/)
- [Static and dynamic libraries](https://pewpewthespells.com/blog/static_and_dynamic_libraries.html)
- [Xcode Build Settings Reference](https://pewpewthespells.com/blog/buildsettings.html)
- [Embedding Frameworks in an App](https://developer.apple.com/library/content/technotes/tn2435/_index.html)
- [Introduction to Framework Programming Guide](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPFrameworks/Frameworks.html)
- [Skippy Copy Phase Strip](https://www.cocoanetics.com/2015/04/skipping-copy-phase-strip/)
