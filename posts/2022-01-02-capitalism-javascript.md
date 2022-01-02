---
title: 'Capitalism and Javascript'
categories: ['javascript', 'capitalism', 'sustainability']
---

Capitalism is well known for using itself to solve the problems it creates. Take the climate change issue; they turned slowing it down into another capitalist game by selling an [offset carbon package](https://en.wikipedia.org/wiki/Carbon_offset). I feel that phenomenon spans to [Javascript](https://en.wikipedia.org/wiki/JavaScript) too. Javascript was pushed beyond their problem domain, and solving problems outside of that domain **created new problems to be solved with more Javascript**.

`node_modules` is a reflection of the capitalist nature of Javascript: layers and layers of problems and solutions that lead to an unmaintainable dependency graph and a vast surface for [security attacks](https://blog.sonatype.com/npm-project-used-by-millions-hijacked-in-supply-chain-attack). **It became so complex that complexity is a new problem domain**. New frameworks, dependency managers, and JS runtimes are emerging to tackle that problem. The thing is that no matter how much you compress that complexity, it remains a brittle foundation.

> Imagine building a skyscraper on a foundation with wood sticks stitched together with nails. One day the earth shakes, and the building collapses because the foundation was not correct.

In capitalism, many people aspire to become wealthier. Sometimes to the point of obsession. Many never profoundly connect to the problem domain because when they start going deeper, they see other opportunities to increase their wealth faster. The same happens in Javascript land. The consequence is a **massive fragmentation of solutions abandoned halfway, and people get confused trying to figure out how to combine them in a way that makes sense**. Some see it a modularized approach to build software. I prefer see it as an inability to reach consensus to create solid foundations. The few solutions that could go more profound than others, like [NextJS](https://nextjs.org), did so by convincing [FOMOed VCs](https://www.nfx.com/post/how-vcs-think-investing-decisions/) that it is a good idea to motivate developers with money. And when money enters the game, you can throw some of it at bringing talent and marketing your solution to the point that **people forget about the web standards and the problems they’d like to solve**.

> We work so high up in the abstractions stack, that's easy to disregard the evolution of the standards, and thus the need for removing some of the abstractions no longer make sense.

The above is why I have a hard time betting on and embracing Javascript and any of its supersets (e.g. [Typescript](https://www.typescriptlang.org)). Every time I play with it, I get to a point when I realize **most of the abstractions, tools, and layers of indirection are unnecessary and sources of future headaches**. I go back to [Ruby](https://www.ruby-lang.org/en/), [Rails](https://rubyonrails.org), and [Jekyll](https://jekyllrb.com) when that happens. They are close to the standards, their mental models are easy to grasp, and built upon a well-supported and thought foundation. It’s a safe bet and, more importantly, and **FOMO-free environment**. It’s easy to focus on building and not on figuring out the best solution to cache state client-side that comes from a GraphQL CDN-cached AP. Damn, how did we get here?

In 2022, I’ll remain open-minded about Javascript's direction and focus on Ruby and Rails.
