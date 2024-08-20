# Requirements

IMPORTANT: You don't have to make a generic blog with posts. It can be ANYTHING! So long as you are able to comment on it, it could be recipes, reviews, products, job listings, podcast episodes, movies etc etc etc

🎯 Created using create-next-app

🎯 Design a SQL schema for a posts table, and a comments table that has a post_id column connecting it to the posts table.

🎯 Either create a form where users can add posts OR seed your database with at least 4 posts that comments can be added to (if you do the seed, one of the stretch goals will be harder).

🎯 Add a form to the individual post page to allow creating a new comment, which is saved to the new comments table including the Post ID.

🎯 Refresh the /posts route data when adding a new post, and redirect the user to the list of posts

🎯 Refresh the /post/:postId route when adding a new comment, so the new comment is displayed on the page

🎯 Add static and dynamic metadata to your pages

## Stretch Goals

🏹 Add a categories table to allow categorisation of posts at creation time using a dropdown menu. Add a /categories route that lists all categories, and a /categories/:id route that lists all posts in a category.

🏹 Add a new /posts/:id/edit route that allows editing a post. Populate the form with the post data, and save changes by updating the post in the database with a server action.

🏹 Add a delete button to the post page that removes the post from the database.

🏹 Add a new /posts/:id/comments/:id/edit route that allows editing a comment. Populate the form with the comment data, and save changes by updating the comment in the database with a server action.

# Reflections

Please also provide an assignment reflection in your project README.md file.
(Required)
🎯 Please mention the requirements you met and which goals you achieved for this assignment.

🎯 Were there any requirements or goals that you were not quite able to achieve?

🎯 If so, could you please tell us what was it that you found difficult about these tasks?

(Optional)
🏹 Feel free to add any other reflections you would like to share about your submission e.g.

What went really well and what could have gone better?
Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).
Describing errors or bugs you encountered while completing your assignment.
Requesting feedback about a specific part of your submission.

# My Reflection

## The Feelings Blog

### A place where you can go to submit how you feel about something and have users give comments to advise you

I met all requirements for this blog, planning the tables on drawSql, drawing the wireframe on okSO and discussing with other members about what type of blog to do. I struggled with sorting out some of the dynamic pages and metaData but it wasn’t anything that stopped me for too long, just silly typo errors.
My Website is not mobile friendly, using Next.js as a new framework and tailwind css for the styling, I wanted my priorities to be reaching the requirements for this assignment.
I knew coming into the assignment that I was going to do the categories stretch goal so I decided to implement a categories table from the get go, deciding and planning this early on really helped with understanding the relationship between the tables more effectively enabling me to add this into my form for the new posts.
From here I tried to focus on the other stretch goals, firstly I started with the delete… The sql wasn’t so bad, using the sql editor on supabase I was able to confirm it was correct, implementing it on vs code was a whole different ball game! I spent the best part of this assignment getting it to work, it took a lot of rubber ducking with another class member Jake but eventually we figured it out so massive thanks to him. I then implemented this with the comments as well.
After I had solved the delete I basically used the same method for the update, a few hiccups with parsing data through props but with another set of eyes on it Richard really helped to point out my typo’s and mistakes to correct them. The part I struggled with was planning how I wanted it to appear on the page, I didn’t want it there permanently so I had to make a few components, some as client components to allow me to use useState so I could show or hide the edit form but this came together pretty quickly. after how long the delete button took and I implemented it to both posts and comments.
Filtering by categories became by next challenge, I tried a few different ways of doing this and most failed! I couldn’t make it work creating a separate client component and using useEffect as I had no way of getting the data from the database, I did try passing props but was having all sort of issues. in the end i just created another page inside my posts page and used another sql go through my category table to get the category names, then I mapped through this sql in a from creating a function to help me do so. Again this was done rubber ducking with class mates Jake and Richard so a big thanks to them!
I styled the website using a combination of tailwind and module.css, I tried to use tailwind as much as possible but in the places I couldn’t I created a module to style it how I wanted. Going forward from this assignment I will try a more mobile friendly approach to what I do.

A couple of things i’d like feed back for is if there is a simpler way to implement the update and delete methods than the way I have done, how to populate the edit form data with what the post/comment had already used and how to reset the forms as I struggled to get these to work for myself.
