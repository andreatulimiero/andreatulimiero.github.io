---
layout: post
title:  "Competitive programming as Sudoku"
date:   2018-04-17 +0200
categories: articles
---
# TL;DR
Solving competitive programming challenges every day will help you recognize common algorithms’ patterns in order to be able to craft **better code** in **less time**   

# The whole story
*Competitive programming is a mind sport in which participants are required to write computer programs to solve a set of logical and mathematical problems - Wikipedia*

But what does it mean that you should take it as a *Sudoku*? <br>
Most likely you won't participate in the World Championships of competitive programming, but you can see these challenges as a stimulating game to:
- Enhance your problem-solving skills
- Learn and recognize common **algorithms' patterns**

To solve these problems, you are not only asked to find a solution, but it must also respect given constraints --- be it memory or time --- thus forcing you to think of **efficient** algorithms.  
The cool thing is that in case your solution is not smart enough, **you're guaranteed there is another one more efficient**, and this is not true at all in real life!  
Nobody is going to tell you << there's a better approach you can take to solve this problem >>.  

Once you've gone through some of these challenges, you'll start recognizing **patterns** in the problem you face, and those patterns will **help** you **quickly understand** how that problem can be solved, and how it can be solved in an **efficient way**.  
This is the same escalation you would experience solving Sudoku's challenges for some time --- your vision becomes kind of sharper while trying to find the right place to insert a new number.  

This means you will not only craft **better code** but also in **less time**

# Talking about numbers
You won't clearly realize every single algorithm in the most efficient way, but sometimes building a solution that requires O(n) instead of O(n<sup>2</sup>) requires you only 5 minutes more. 

Let's suppose you're prototyping a function with an internal algorithm that works in O(n<sup>2</sup>) and requires 0.001s per iteration, and you test it on a set of 1000 items, which means it requires you &cong; 1.5 minutes. Loosing 5 minutes more to create an algorithm that works in O(n), which requires 0.1s to complete, means that after running it 4 times you've already gained from it - and as far as I'm concerned, you need way more attempts to create a working algorithm. <br>
Once you ran it 20 times you pass from 30 minutes to 5.5 minutes

# In conclusion
My suggestion is to make solving these challenging problem a habit.  
A great platform to train yourself in your spare time is HackerRank, in which you can choose from a plethora of problems divided by category and difficulty so that you can get started from the easiest ones --- the same way you would do with Sudoku ;)
