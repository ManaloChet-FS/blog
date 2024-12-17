---
title: "Password hashing"
date: "12/17/2024"
desc: "Post about the magic of password hashing!"
hero: "/security.jpg"
heroAlt: "The word 'Security' is focused on a computer screen."
---

The process of password hashing starts with a user's password and ends with a crazy looking string of characters. The conversion of the original string to the completely new string happens due to some sort of mathmatical function that can't be reversed. I've never been the best at math so I can't explain how it works, but it works, and that's what matters! To ensure that the password hash is as secure as possible, you can add salt to the mix. A salt is a string of additional characters that's combined with the original string. The salt should be unique to every user to be effective or it'll be basically useless. Don't worry about obfuscating salt as its safe to store in plaintext. If the database where you keep user passwords gets hacked, you can be assured that a hacker will have no clue what the passwords actually are and will have no way to reverse the hash.