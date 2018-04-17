---
layout: post
title:  "Competitive programming as a Sudoku"
date:   2018-04-17 +0200
categories: articles
---
*Competitive programming is a mind sport in which participants are required to write computer programs to solve a set of logical and mathematical problems - Wikipedia*

But what does it mean that you should take it as a *Sudoku*? <br>
Very likely you won't participate to the World Championships of competitive programming, but you can exploit such challenges to:
- Enhance your problem-solving skills
- Learn and recognize **algorithm patterns**

In fact, to solve such problems, you are asked to find a solution that must respect given constraints --- be it memory or time constraints --- thus forcing you to think of **efficient** algorithms. <br>
This is --- IMHO --- the most important skill you can develop while solving these challenges.

The cool thing is that in case your solution is not smart enough, **you know there is another one more efficient**. <br>
This is not true in real life CS problems! Nobody is going to tell you "there's a better approach you can take to solve this problem"

Once you've gone through some of these challenges, you'll start recognizing patterns in the problem you face, and those patterns will help you quickly understand how that problem can be solved, and how it can be solved in an efficient way. <br>
This means you will not only craft **better code**, but also in **less time**

You won't clearly realize every single algorithm in the most efficient way, but sometimes building a solution that requires O(n) instead of O(n<sup>2</sup>) requires you only 5 minutes more. 

Let's suppose you're prototyping a function with an internal algorithm that works in O(n<sup>2</sup>) and requires 0.001s per iteration, and you test it on a set of 1000 items, which means it requires you &cong; 1.5 minutes. Loosing 5 minutes more to create an algorithm that works in O(n), which requires 0.1s to complete, means that after running it 4 times you've already gained from it - and as far as I'm concerned, you need way more attempts to create a working algorithm. <br>
Once you ran it 20 times you pass from 30 minutes to 5.5 minutes

A great platform to train yourself in your spare time is HackerRank, in which you can choose from a plethora of problems and three different levels of difficulty, so that you can get started from the easiest ones --- the same way you would do with Sudoku ;)
