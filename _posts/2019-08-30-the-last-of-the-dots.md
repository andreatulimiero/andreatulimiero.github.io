---
layout: post
title:  "The last of the dots"
date:   2019-07-03 +0200
categories: articles
---

If you want to transform your [twitter.com](https://twitter.com.) in a *blank page*, or log out from [youtube.com](https://youtube.com.), you're just "a dot away".

P.S.:
Some browsers correct the url address of [youtube.com](https://youtube.com.), so the magic won't happen.
If you want to try this out, visit [youtube.com](https://youtube.com) and then add a "." at the end of the url -- this should do the trick.

# The long story
Since the beginning of the internet, we think of website addresses in the form of something like "foo.com" or "bar.net".
Well, strictly speaking, these are not 100% what you were most likely looking for.
In fact, a domain like "foo.com" is a so called Partial Qualified Domain Name, or relative domain name, meaning that it does not describe the full path to reach a domain.
On the other hand, an FQDN (Fully Qualified Domain Name), or absolute domain name, do contain all the path nodes needed to traverse the three hierarchy of the DNS (Domain Name System).

# A regression on DNS
If you're quite familiar with how DNS works, you can skip this part an go directly to the next one; otherwise, I'll briefly drive you through what DNS is and how it works.

Back in the days of [ARPANET](https://en.wikipedia.org/wiki/ARPANET), nodes in the network where solely identified by their unique IP address.
Although easy for a machine, it wasn't that convenient to remember an email address by it's 4-byte numerical representation.
It didn't take much since DNS, which stands for Domain Name System, was proposed and introduced. Simply speaking, DNS is nothing more than a distributed database of mapping between domain names and IP addresses.

One of the most important characteristics of DNS is that it is *hierarchical*, meaning that the parent (e.g. `net.`) of a domain space (e.g. `*.net.`) is responsible for keeping the information needed to reach out its children.
However, `net.` is not responsible for all its descendants, but rather only for its children. This means that the one in charge of retaining the directions to reach `foo.bar.net.` is its parent `bar.net.`.

The most sharp readers surely noticed that there is a *dot* (`.`) at the end of the domain names I used in the previous examples.
In fact, we could keep climbing the hierarchical chain of `foo.bar.net.` up to just `.`.
This domain is a very special one, and is called the *root domain* -- the father of all domains.

To sum up, if we want to know how to reach a certain domain `foo.bar.net.`, and we don't know how to reach out any of its predecessors, we can ask recursively (starting from the *root domain*) where a child is: `.` &rarr; `net.` &rarr; `bar.net.` &rarr; `foo.bar.net.`.

So what if we don't know the address of `.` either? Well, there's nothing you can do about it.
In fact, the IP addresses of the servers responsible for the "root domain" are in most of the cases hard-coded in a device, so that it is capable of bootstrapping this search chain.

At this point you might be wondering "Are all the domains I've been using until now wrong?".
Well, let's say not completely.
Domain names not ending with the *root domain* `.` are, as mentioned before, relative domain names, which are evaluated differently depending on the network you are in.
So, if you are in the network `.bar.net.`, and just ask for `foo`, then the resolver of your request assumes that you are implying `foo.bar.net.`.
This might actually come in handy, but it can also lead to ambiguities.
Suppose that you are in a network `net.`, and you would like to visit `foo.bar.`. Now, let's also suppose that in the `net.` network, there is a domain registered as `foo.bar.net.`, which is totally legitimate.
If you just ask for `foo.bar`, you will end up getting information for `foo.bar.net.`, and not `foo.bar.`.

Again, this is a totally intended behavior, but this was an example to show you how relative and absolute domain name behave in certain situations.
