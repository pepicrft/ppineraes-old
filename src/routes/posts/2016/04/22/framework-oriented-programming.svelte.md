---
layout: post
title: "Framework Oriented Programming (iOS/tvOS/macOS/watchOS)"
excerpt: "Architectural approach for iOS/tvOS/macOS/watchOS based on organizing your business logic in frameworks"
modified: 2016-04-22
tags: [frameworks, swift, cocoapods, carthage, tvos, ios, watchos]
---

[**All this post resources are available on this repository**](https://github.com/pepicrft/framework-oriented-programming)

> The concept of Framework Oriented Programming is formulated as a set of principles that are getting improved as I iterate over this idea in real scenarios. Some of these principles might change. **Any open question that you might have feel free to propose it via email [pedropb@hey.com](mailto://pedropb@hey.com)**

The ideas behind this paper are not new. They're based on existing principles and programming paradigms. My goal is to put them together, motivating and introducing Swift/Objective-C developers into something I called "Framework Oriented Programming (FOP)".

|            | Section                                                             |
| ---------- | ------------------------------------------------------------------- |
| :mag:      | [**Context**](#context) state of art in project architectures       |
| :candy:    | [**Motivation**](#motivation) why we came up with this architecture |
| :one:      | [**Principles**](#principles): for a right implementation           |
| :surfer:   | [**Example**](#tutorial) how to implement it in your projects       |
| :surfer:   | [**Tutorial**](#tutorial) how to implement it in your projects      |
| :question: | [**Open Questions**](#open-questions) that you might also have      |
| :book:     | [**Reference**](#reference) and resources that might be useful      |

# Context

![Persistency Framework with the universal configuration](/images/posts/apple-software.png)

We've always been told as a developers to follow one basic principle of design, try to make your code _reusable_. Design your classes, your business logic, your projects to be reusable. Project them into the future and imagine how these components could be used on different scenarios and contexts, pay special attention to the dependencies and prefer abstractions over concrections... There are bunch of principles and philosophies that can be applied to create reusable code from a low level perspective. However, when it's about going higher in the stack, we forget about it and we end up having projects tied to the platform and tied to our product use case. **What if we could design our apps in a way that could be easy to reuse and platform independent?**

Nobody predicted a few years ago we were going to have so many platforms to develop for in Swift/Objective-C. Mobile platforms and iOS was the first step for a lot of developers that wanted to give a try to something new, playing with the new features and possibilities that mobile development offered. By that time, the focus _(and also my focus)_ was coding for iOS. I didn't think I could need part of all that code in future projects, and thus, I treated my projects like big boxes _(not black because I knew about the magic I was placing inside)_ that implemented from UI tasks to interactions with the database. The big box was the **main app target**, that one that Xcode creates for you when you start a new project from the scratch. Later on, thanks to [CocoaPods](https://cocoapods.org) we easily connected our big box with other external small boxes, [AFNetworking](https://github.com/afnetworking/afnetworking), [MagicalRecord](),... I'm sure some of them are familiar with you.

We were taking advantage of reusable components that other developers where offering in open. That saved and saves us a lot of time nowadays. However _(and unconsciously)_, our project was likely tied to the platform and the product use case we were coding for:

- Using UIKit from every single piece of code in our app.
- Designing the API layer to interact with a pre-existing API.
- Reusing models in multiple layers. Sometimes even models that came from _CoreData_, _Realm_ or any other persistence solution.

Our box seemed to be also tied to our external dependencies and we could live with it. The problem came up either when from the product perspective the company pushed the software engineers to have a _watchOS_, a _tvOS_ or add a new application to the family. That new application was supposed to reuse most of the things were already implemented in the existing app.

> Yes! that moment when someone said: Oh, actually it should be very straightforward since we should be able to reuse most of our code from the main app. _(And your face turned into a poem)_

Our code bases were not ready to these big changes. Then some of us took the **workaround** way, that term so familiar for many developers. Apple was pushing towards using dynamic frameworks for watch apps, why not following what Apple said? I create another target for the watch app, and share some classes between my application and the watch one. Problem solved! This solved part of the problem partially, and workarounds shouldn't be the way we solve our problems, they are breakable, fragile, and don't scale.

# Motivation

It was then when I decided to invest some time in figuring out how applications nowadays should be structured and documented it on this paper. The main goal of this architecture proposal was:

- **Easily expand to new platforms:** Creating a new version of your project for another platforms should be as easy as working on the UI layer, reusing all the business logic that comes already implemented in your frameworks.
- **New products with similar core needs:** This is very sweet for startups, since it allows product related iterations. Companies can benefit from this adding new products to the stack that share the same core logic as other products _(e.g. the new product interacts with the same API, the data model is the same...)_
- **Aim open sourcing:** Have you ever wanted to open source a component in your project and it was hard because it was designed to be used in your product? What if it was designed in the other way around without thinking about where the component would be used? Designing without thinking in the use case leads to more generic implementation that might be handy for other developers and so, open-sourceable from your side.
- **Plug in an out pieces with ease:** Having the business logic separated in small pieces helps when the project needs a replacement for any of these pieces. As the code is very isolated and the public interface abstracted these pieces could be easily replaced just exposing the same interface but replacing the private implementation.

I called it _"Framework Oriented Programming"_ and brought the joyfulness of playing with **LEGO** to the Swift/Objective-C development.

# Principles

### 1. Single responsibility

SOLID principles also apply to a framework. Frameworks should satisfy the single responsibility framework. They should have only one responsibility. If any of your designed frameworks might have multiple responsibility, think about slicing it in more layers.

> For example, if we have an API interaction layer, and it offers not only the wrapper to the Foundation Networking layer but the requests factories and models _(tied to your project use case)_ think about splitting them into a `Networking` and an `API` frameworks.

Frameworks that apparently had only one responsibility might get more later. It's up to the developer to identify that and take action on it, either separating them into multiple frameworks or extracting the logic that should be in a different one.

Defining the responsibility of a framework is not easy. Think about a Framework as a box, that you give data to, it **does something** with your data, and provides you with some results. _"Does something"_ is your framework's purpose. Keep that purpose simple and scoped.

> Build single purpose boxes

![Framework responsibilities](/images/posts/Framework-Responsibilities.png)

### 2. Vertical dependencies over horizontal

Design your frameworks graph as a stack with multiple layers where the application is on the top. Avoid horizontal dependencies between frameworks in the same layer and prefer vertical dependencies down in the stack. If any framework needed to know about other, you might need a layer that _"puts them in touch"_, on top of them. A very simple example would be the data synchronization in your app. We might have a framework for an HTTP interaction with your API, another one for persisting the data and think about getting to know each other to persist the responses from one using the other one. You're unconsciously coupling these two frameworks horizontally. Let's come up with a new framework on top of these responsible of that _synchronization_ between local and remote.

> Design your stack dependencies vertically

![Vertical structure](/images/posts/Framework-Vertical.png)

### 3. Lower in the stack, fewer dependencies

The number of external dependencies should be directly proportional with the level of the framework in the stack _(i.e, the lower in the stack the less the external dependencies it should have)_. Dependencies of lower levels are also dependencies of upper levels, thus, the more dependencies we we have in these levels the more complex the graph and the setup becomes. Figure out if your Framework really needs that external dependency that you are thinking about. Most of the times we end up checking out dependencies to use only a few components from them. Checkout only these components/extensions/classes that you really need, or implement them by your own whenever it's possible.

> Reduce external dependencies as you go lower in the stack.

![External dependencies](/images/posts/Framework-External.png)

### 4. One step dependencies

Frameworks should know only about the framework below _(one step)_. Deeper dependencies should be wrapped by the framework you are depending on _(either these deeper dependencies are local or external)_. Never expose them up, proxy the protocols, and wrap the models from the framework.

This makes replacement in the future easier. For example if you used another persistency solution like [Realm](https://realm.io) that uses their own defined models and you exposed them from your Framework

> Don't expose lower dependencies to upper levels. Wrap them!

![OneStep framework](/images/posts/Framework-OneStep.png)

### 5. Internal by default

If you're using **Swift**, congrats :tada:, you get this for free. All components are by default `internal` and they won't be visible form other frameworks unless you specify it with the `public` modifier. As soon as you start _"consuming"_ your frameworks you'll figure out which components have to be `public`. In case of **Objective-C** keep the headers private in the target headers configuration and make `public` only these that must be visible. When a component is `public` the developers that are depending on that frameworks feel the _"freedom"_ and _"flexibility"_ that leads to a misuse and coupling with private code.

> Make framework components internal by default and make public only these needed.

![Framework's internals](/images/posts/Framework-Internal.png)

### 6. Framework models

Each framework should implement their own models. If you share models between multiple frameworks you are coupling these frameworks to the frameworks that provide these models. That said, a `Networking` framework should have defined models representing API responses, and a `Database` framework should have their own `Database` models. If these models are combined in a business logic framework, `Core` then they should be wrapped into different models.

> Each framework defines its own models

![Framework models](/images/posts/Framework-Models.png)

### 7. Platform abstraction

Decouple your framework from platform specific frameworks. What does it mean? If there's a Framework that is `macOS` or `iOS` only, for example `UIKit` or `AppKit`, try not to couple your framework to it. Instead come up with these components that you might need, a `Color` or a `Font` class/struct. You can create extensions and platform macros to convert these frameworks components into components that are easier to work with from the application.

- Swift Preprocessor Directives: [Link](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithCAPIs.html#//apple_ref/doc/uid/TP40014216-CH8-XID_20)
- Target conditionals and availability: [Link](https://www.cocoanetics.com/2012/09/target-conditionals-and-availability/)

> Decoupled from platforms, extended to make it nicer to play with for platforms.

```swift
#if os(OSX)
// OSX only code
#endif
```

![Single Responsibility](/images/posts/Framework-Platform.png)

### 8. Protocol oriented interfaces

Abstract your public interfaces with protocols. That decouples the access layer from the implementation. If a framework `A` depends on the protocol based interface of `B`, `B` can update its implementation without requiring any change in `A` _(since the exposed interface is the same)_. This principle is aligned with the Swift philosophy based on protocols, and that is well known as _Protocol Oriented Programming_. The same programming paradigm that applies to this principle. Your frameworks are responsible of certain tasks and you define them in a protocol based interface.

> Define your Frameworks interfaces using protocols

![Single Responsibility](/images/posts/Framework-Interface.png)

# Example

![FOP Example](/images/posts/Framework-Stack.png)

There's an example project in this repository that includes:

- External dependencies resolved using CocoaPods.
- Local dependencies added manually to the same workspace.
- External dependencies for local frameworks using Carthage.

The stack of frameworks of that project is the one shown above. Networking/Persistency are responsible for interacting with the Rest API and the local database/keychain respectively. Core is responsible of the example business logic. Design includes set of reusable design models and values and Foundation provides components that are used by all the application frameworks.

To setup the project locally:

1. Git clone the repository `git@github.com:pepibumur/framework-oriented-programming.git`
2. Install bundle dependencies `bundle install`
3. Install carthage if you didn't have it installed `brew install carthage`
4. Execute `bundle exec pod install` to resolve CocoaPods dependencies and create the workspace with them.
5. Execute `bash script/dependencies` to resolve Carthage dependencies.
6. Open the project using `Frameworks.xcworkspace`.

# Tutorial (Dynamic Frameworks)

### 1. Workspace

The first thing you need is a workspace where all the projects will be. If you already got the one from CocoaPods you can use that one. If not, from Xcode you can easily create it. From `File` select `Save as Workspace...`. Voila! :tada:, workspace created. Your workspace includes your application project.

### 2. Adding your first framework

Let's our persistency framework. With `File > New Project` create a Framework _(it can be either iOS/OSX)_ we'll make it universal later on using a configuration file. In the creation dialog, select the option for adding the project to the Workspace that you have opened. The project will be automatically added to the same workspace.

### 3. Making it universal

You might have notice that frameworks have different settings depending on the platform. If you create an iOS Framework and a MacOS framework and diff the project build settings you'll notice that some parameters differ. Fortunately, configuration files allow conditional variable assignment _(you can read more about it [here](https://pewpewthespells.com/blog/xcconfig_guide.html))_. It allows specifying the configuration depending on other variables like the SDK. In this project you'll find an [universal config file](https://github.com/pepicrft/framework-oriented-programming/blob/master/Config/Base.xcconfig) that takes advantage of that to haven an universal configuration. Once you set that `.xcconfig` file as the configuration for your Framework it could be used from a `iOS/tvOS/macOS/watchOS` application. Here's a short example of how the configuration file looks like:

```bash
SUPPORTED_PLATFORMS        = iphoneos iphonesimulator appletvsimulator appletvos macosx watchsimulator watchos
VALID_ARCHS[sdk=iphone*]                = arm64 armv7 armv7s
VALID_ARCHS[sdk=macosx*]                = x86_64
```

Get this configuration file, add it to your framework project, and set it as your framework project configuration as show in the screenshot below:

![Persistency Framework with the universal configuration](/images/posts/Framework-Configuration.png)

> Note: Make sure the keys defined in the configuration file are not overriden by your project or your target `Build Settings`. In case they are, just select the overriden key row in `Build Settings` and delete it.

With this you'd have your first Framework created. Build it for a generic device, e.g. iOS.

### 4. Linking Frameworks

Once you've learnt how to create universal Frameworks implementing the `Persistency` framework let's create one responsible of your application business logic, `Core`. Repeat the same steps above.

Once you have the `Core` framework created open the `Core` target `General` tab and add the `Persistency` framework in the `Linked Libraries and Frameworks` section. Xcode will add the `Persistency` framework in your project group _(move it to a Frameworks group, if you don't have it, create it)_.

![Core Framework linking against the Persistency one](/images/posts/Framework-Linking.png)

Select the `Persistency.framework` from the inspector and in the right menu change the Location to `Relative to Build Products`. The previous step is very important to make sure we're using paths relative to the `Build Products` directory.

![Core Framework linking against the Persistency one](/images/posts/Framework-Location.png)

> Note: You should see as Location `Persistency.framework`. If you got a different location it's because you didn't build the `Persistency` framework before **(for the platform you're linking against)** and Xcode is unable to ind the Framework `Build Products` directory.

### 5. Linking your app

Once you have designed your stack of Frameworks it is time to link all of them with your application. Your application should link against all these Frameworks. Open your application target and add all the frameworks to the `Embedded Binaries` section.

As happened when we linked with Frameworks Xcode will add these Frameworks to your project group directory. Move them into a `Frameworks` folder and update their Location to `Relative to Build Products`.

If you build the app it should work! :tada:. Import your Frameworks and use them:

```swift
import Core
```

# Open questions

## Dependency managers

It's possible. Both dependencies managers support either local or remote dependencies. Let's see the advantages/disadvantages of each approach:

### Manual

When you setup everything manually, you have more control over it and it's harder to get the setup broken with Xcode updates. You have to invest some time to setup everything properly but once done you don't have to change it anymore unless you introduce new frameworks in the stack. Not exactly a disadvantage, but the manual process requires more context about _build settings_. Something you save with dependency managers like CocoaPods where the setup is abstracted in a specification file `.podspec` _(where you specify how your framework will be integrated with the application project)_.

### CocoaPods

Using CocoaPods saves setup time since once you create the frameworks using the command line script, the only thing the developer has to do is adding the dependencies between them in the `.podspec` files. As a disadvantage of this approach is that the control of the framework configuration is more on the CocoaPods side and it might get broken easily with Xcode updates. Moreover if you use any Swift dependency in your project, you're force to use `dynamic libraries` with all your dependencies, including your local ones. What if you want one of them to be static?. It's also hard to connect local dependencies since you cannot specify a `path` for your dependencies in the `.podspec`. There are workaround to that problem though, either you help CocoaPods discovering these dependencies in the Podfile, or just move them into different repositories and having a private CocoaPods repository.

### Carthage

Using Carthage for setting up your local dependencies doesn't make sense at all. However, if you need any external dependency, you can use the dependency resolution component of Carthage to checkout these projects in a `Carthage/Checkouts` folder and add them to the same workspace where all the frameworks projects are. If ask Carthage to build these dependencies into `.framework`s and use them instead, keep in mind that these frameworks are compiled with an _Xcode_ and either if you update Xcode or checkout the project from the scratch, you will be forced to recompile them.

## Git repository

Another question that arises in regards frameworks is where should these frameworks be? Should they be in the same repository? Should they be in multiple repositories?

You can choose what's best for you, the same principles explained above apply. However, if you don't want to make your development slower I'd recommend you to keep them in the same repository.

**Why?**

When you have the frameworks in multiples repositories every change involves a new commit, that has to be validated, reviewed and pushed to the remote repository. Then, your project has to be updated to point to the last `version`/`commit`/`tag` of your updated framework.

**When should I move them into a different repository?**

- When it's a consolidated Framework.
- When it support versioning either using a Git tags, pod version, ...
- When you designed it to be open source.

## Versioning

Frameworks support versioning. Versioning is also supported by dependency managers. In case of CocoaPods, it's specified in the framework `.podspec` file and in Carthage using _Git releases_. Connected to the previous point, versioning doesn't make sense at all if all the frameworks are in the same repository. Only if you have them extracted in their own repositories versioning becomes useful.

**Why?**

- You know what's new with each version.
- You can easily point your app back to a previous version if a regression/bug was introduced.
- You have stable snapshots of your frameworks instead of a constantly evolving codebase.

## Static or dynamic

If your frameworks code is `Swift` you don't have alternative other than using **dynamic frameworks**. They were recently introduced for iOS. Dynamic frameworks are linked with your app in runtime and allow embedding resources. Dynamically linked code allows reusability of your code, you can have two frameworks depending on the same framework without getting duplicated symbols errors. `Objective-C` can be either statically or dynamically linked. The benefit of static linking is that launch time is much better but these frameworks or libraries are hard to reuse unless you use a tool like [CocoaPods](https://cocoapods.org) that helps with these conflicts that might arise with static libraries, making sure that they're not duplicated.

- **Dynamic**

  - If your framework includes Swift code.
  - **Disadvantages**
    - Worse load time.

- **Static**
  - If your framework has only Objective-C.
  - If your framework is not shared across multiple frameworks.
  - **Disadvantages**
    - Higher disk/memory consumption

If you want to read more about static and dynamic frameworks and libraries I recommend you to go through [this](https://pewpewthespells.com/blog/static_and_dynamic_libraries.html) website.

## External dependencies

Ideally external dependencies should be simplified because otherwise your dependencies tree complexity increases and you tie all your frameworks to these external sources. Try to avoid _wrappers_ around system provided frameworks like `CoreData` or `Foundation`. If it's not possible to remove an external dependency from a local framework then find the best approach for integrating that dependency into your workspace:

- If you used **CocoaPods** for managing all your project dependencies then the best approach is using the same dependency manager. Specify these external dependencies in the respective `.podspec` files and that's all.
- If you preferred the manual manner, then you have to add these dependencies to your workspace. They can be either:
  - Resolved and checked out using **Carthage**.
  - Checked out using **Git Submodules**.

# Reference

- **Library Oriented Programming** _(Justin Spahr-Summers)_ - [Link](https://realm.io/news/justin-spahr-summers-library-oriented-programming/)
- **Building Modern Frameworks** _(Apple)_ - [Link](https://developer.apple.com/videos/play/wwdc2014/416/)
- **Creating your first iOS Framework** _(Thoughtbot)_ - [Link](https://robots.thoughtbot.com/creating-your-first-ios-framework)
- **Awesome iOS** - [Link](https://github.com/vsouza/awesome-ios)
- **How to create a Framework for iOS** - [Link](https://www.raywenderlich.com/65964/create-a-framework-for-ios)
- **Framework vs Library** - [Link](http://www.knowstack.com/framework-vs-library-cocoa-ios/)
- **Static and Dynamic LIbraries** - [Link](https://pewpewthespells.com/blog/static_and_dynamic_libraries.html)
- **The Unofficial Guide to xccconfig files** - [Link](https://pewpewthespells.com/blog/xcconfig_guide.html)
