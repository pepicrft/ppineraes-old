---
layout: post
title: "Network Testing - Say hello to Szimpla"
excerpt: "Introduction post for the last library that I've been working on, Szimpla."
modified: 2016-06021
tags: [xcode, ios swift, objective-c, testing, appcode]
---

**Where does Szimpla come from?** For those who are curious about the naming, I got the name from a famous [Ruinpub in Budapest](http://welovebudapest.com/clubs.and.nightlife.1/budapest.s.most.famous.ruin.pub.szimpla.kert) I liked the name the first time I heard about it and I decided to use the name for this testing library _(later on I discovered that there’s also a [Szimpla in Berlin](http://www.szimpla.de/))_. Translated from the Hungarian it means _“Single”_ which doesn’t match with what the library is actually doing…😖

**What’s Szimpla?** It’s a Swift framework that helps developers testing Networking on their applications.

**But.. what’s the purpose?** Although we might provide unit and acceptance tests with our apps, for example, how request factories build the requests _(unit tests)_, how the application can navigate from one view to the other _(acceptance tests)_, there’s some stuff that is hard to test with the existing testing approaches & frameworks. That explains why companies like Facebook came up with a [_library_](https://github.com/facebook/ios-snapshot-test-case) for testing layouts using snapshots, and developers keep building tools, ensuring we don’t leave any area without testing. Szimpla does something similar to what the Facebook library does but instead of snapshotting views, it records requests. _The library allows you record all the requests that have been sent during some code execution or while navigating through the app and use the recorded data as expectations for future executions._

**Where is it useful for?** It’s useful for all the networking stuff whose result has no direct result over the UI, for example Analytics. _How many times have you forgotten sending an event, or you just sent it with the wrong parameters and them the analytics team at your company complained about events not being sent or sent with the wrong information?_ Probably a few times before… One of the reason why these things happen is because we cannot test it with Acceptance Tests since it’s a “backend” functionality and because these network calls are triggered probably from user actions, views life cycles and it’s something we don’t usually test with unit tests. _There’s a clear need there, isn’t there?_

> Inspired by a similar library that we use at SoundCloud for acceptance tests implemented in Frank I came up with a solution more flexible that can be used directly XCTest. Check it out at https://github.com/pepicrft/szimpla

---

## Installing Szimpla

Thanks CocoaPods! It’s super easy if you’re using CocoaPods with your project. Just add the line for the [Szimpla](https://github.com/pepicrft/szimpla) dependency:

`gist:pepibumur/056f9d27d90096f7084fa7f24bdbd3fc`

## Defining the Snapshots Directory

Part of the setups including specifying in which directory the requests snapshots should be saved. It’s done via an Environment Variable that has to be defined in the application scheme as shown in the screenshot below:

> If for any reason you forget this step, the test will assert trying to initialize Szimpla.

## Using it with Acceptance Tests

The first time you define the test you should run it recording the requests and saving them locally. Execute your test with record. Once it gets recorded. You can update the recorded requests according to your needs _(you can even use regular expression)_. Then update the record method to use the validate one. Future tests executions will use the recorded data to match the requests.

`gist:pepibumur/7bfe2c9bc71298cb2bb02989111b6afd`

## Using it with Unit Tests (Nimble Expectation)

[Szimpla](https://github.com/pepicrft/szimpla) also provides expectations for Nimble. You can apply the same logic to your pieces of code and check if after a given closure is executed, a set of requests have been sent:

`gist:pepibumur/09cb0838aef77fdd3726fa98271f7b16`

---

## Next steps

I have some ideas in mind to keep improving the library and adding more features. Once developers and companies start using it I guess more will come up. Just mentioning a few of them:

- **Allow custom validators:** The users could provide the own validators. So they could define how to match the recorded requests with the saved requests.

- **More filters:** The library only provides one filter based on the base URL. New filters would allow the user to filter the requests depending on parameters, headers, …

#### Feedback is welcome, I’m looking forward to hearing from you and improve the library with your help. Drop me a line to [pedropb@hey.com](mailto://pedropb@hey.com) if you’re considering using it and you have some concerns or ideas.
