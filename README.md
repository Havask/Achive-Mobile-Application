
## Achive mobile app

A mobile application built with React native, firebase, and JavaScript that is used to socialize and create groups would likely have a variety of features to help users connect and interact with each other. It would likely have a user-friendly interface that allows users to easily create and manage their own groups, invite other users to join their groups, and participate in group discussions and activities. The application would likely use firebase to store and manage user data, such as user profiles and group information, and to provide real-time updates and notifications to users. It might also use JavaScript to add interactive and dynamic elements to the user interface, such as animations and other visual effects. Overall, this type of mobile application would be a useful tool for people who want to connect and socialize with others, and to create and manage their own online communities.

## Project Status

Since this project is not currently in development, its performance and the status of its packages may be compromised. Users may still be able to register, create, join, and leave groups, but some features may not work as expected. The application is still hosted by firebase.

## Project Screen Shots

<img width="223" alt="Reg" src="https://user-images.githubusercontent.com/69583492/206919116-5e8f70e0-d9d1-4dd8-aa0b-a53c292bf9bd.png"><img width="228" alt="Login" src="https://user-images.githubusercontent.com/69583492/206919108-e49fccc7-1495-441a-bcc7-f631a293f2fa.png"> <img width="223" alt="groups" src="https://user-images.githubusercontent.com/69583492/206919011-7d4bd9c5-066b-48cd-b13b-1479020fbeb9.png"><img width="223" alt="Discover" src="https://user-images.githubusercontent.com/69583492/206919021-3b8f96f8-b2a5-4454-921e-b8b31218fa80.png"><img width="223" alt="Create" src="https://user-images.githubusercontent.com/69583492/206919042-c490249b-87de-4763-bea2-6bfd829e5262.png"><img width="223" alt="settings" src="https://user-images.githubusercontent.com/69583492/206919026-73be84ff-d1c8-4559-b907-5b1a9b88ad60.png"><img width="223" alt="Feed" src="https://user-images.githubusercontent.com/69583492/206919033-9aa933ce-30c1-47d8-b20a-4dc21414b32f.png"><img width="223" alt="Feed" src="https://user-images.githubusercontent.com/69583492/206921792-4518873d-aee2-4ef8-8ad3-951ea970cfba.png ">





## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  


To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/ideas`  

## Reflection

  - What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)
  - What did you set out to build?
  - Why was this project challenging and therefore a really good learning experience?
  - What were some unexpected obstacles?
  - What tools did you use to implement this project?
      - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your choices and justify them here.  

#### Example:  

This was a 3 week long project built during my third module at Turing School of Software and Design. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to pull data from the Twitter API based on what they were interested in, such as 'most tagged users'. I started this process by using the `create-react-app` boilerplate, then adding `react-router-4.0` and `redux`.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

At the end of the day, the technologies implemented in this project are React, React-Router 4.0, Redux, LoDash, D3, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a `webpack.config.js` file to more fully understand the build process.
