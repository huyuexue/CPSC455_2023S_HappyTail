# CPSC455_2023S_HappyTail

# Project Description:
Happy Tails is your go-to destination for pet adoption. Our user-friendly platform connects you with cats and dogs in need of loving homes. We provide detailed pet profiles, including breed, age, gender, and photos, so you can easily find your perfect companion. Join us to connect with your dream pet!
# Project Requirements:

## Minimal Requirements
1. - [x] Each pet has its own information card, which includes: photo, name, breed, etc.

2. - [x]  Search panel: user can search for pets based on parameters like age, breed, size, etc.

3. - [x] Result page(on browse page): display all the pet cards with brief information based on customer search parameters, and users are able to click on a card to see details regarding any pets

4. - [x] Add new pet panel: include all information mentioned in minimum requirement 1, plus contact information.

5. - [x] Pet card can only be edited/deleted by its owner.

## Standard Requirements
1. - [x] Sign up/log in/log out
- User will be able to sign up an account
- User with existing account will be able to log into his/her account, and safely log out

2. - [x] User will be able to edit his/her profile

3. - [x] 2 types of users: pet owner and pet adopter
- Different users will see different dashboard after they log in

4. - [x] My listing (Dashboard)
- User will be able to add new pets looking for adoption, update and deleter his/her existing lists
- Users need to have an account and log in if they want to do the above operation.

5. - [x] My Favorite (Dashboard)
- User will be able to add pets to his/her favorite list, and delete if they want
- Users need to have an account and log in if they want to favorite/un-favorite a pet.

6. - [x] Share pet with friend: user will be able to share the link of a pet by clicking a share button.


## Stretch Requirements
1. - [x] Integrate website with external API: EmailJS, where user will be able to send email to pet owner once open the preview of pet information card.

2. - [ ] Recommendation algorithm to show users pets based on his/her search history

# Tech from Units 1-5
1. Unit 1 (HTML, CSS, JS) With JavaScript, we've implemented features such as pet form validation, asynchronous data fetching, and interactive UI elements, ensured a smooth and engaging user experience. While the HTML's structured layout and CSS's styling capabilities have contributed to a visually appealing web page.
2. Unit 2 (React & Redux) React helps facilitate an efficient development process as we can break down the application into reusable components. e.g, both add new pet and update pet has used the same PetForm component. This helped improved code maintainability and enabled us to create consistent UI elements across the application. While Redux helped to centralizes multiple states in a single store, enabled us to track and manage state changes efficiently.
3. Unit 3 (Node & Express) - REST API offered us seamless interaction with web applications. REST's simple architecture and support for HTTP calls enabled us to efficiently manage the transition of pets data  and user data from between FE to and BE.
4. Unit 4 (Mongo DB) - MongoDB offers greater flexibility and speed for our application which frequently reads/writes data. Its dynamic structure and easy querying make MongoDB a superior option compared to traditional SQL databases, enhancing the overall performance and user experience of Happy Tails.
5. Unit 5 (Builds and Deployment) - For greater customizability and control over our deployment, we opted to use a virtual private server (VPS) supplied by DigitalOcean for the hosting of our project. This allowed us to deploy the backend on the same machine as the front-end was served, as well has having very fine control over how the stack was run. Our application was served using pm2 on the VPS. The domain happytails.tech was also linked to this server through gandi.net.

# Above and Beyond
1. AWS - We used amazon s3 object storage for pet images. When the upload button is clicked, the image is first uploaded to s3, which then returns a URL that is added to the pet object with the rest of the data before sending it to the BE.
2. Login - We used Firebase to maintain user login status, ensuring data security, privacy, and managing users' email and information. The frontend generates a JWT, which the backend verifies to authorize access to user information.
3. Send Email - Integrated with external API EmailJS, allows interested users to send email to pet owners while protecting the owner's personal information.
4. Custom Domain - We integrated our deployment with a custom domain at www.happytails.tech, as well as setting up our own custom email address behind this domain.

# Next Steps
1. Include location services, pets that are closer to users will show on the top of the search result page.
2. Save users' search histories, customize search results based on users' past search history.
3. Implement direct message function, allow users to interact with each other through the application.

# List of contributions
- Ayan Das: I worked on some of the front-end features like petCarousel and Home page buttons during the initial stages of the project. I then built the pet REST API on the backend, as long as setting up and connecting the API to mongoDB. I did the database management and generated test data, I also created a fields document to make sure everyone was working with the same fields. Lastly, I built the backend feature to search/browse pets with custom queries and also built the upload image capability in the pet uploadForm using Amazon s3.
- Tina Hu: I mainly worked on implementing the frontend functionality for adding and updating pet information, ensuring data validation before transmission to the backend. I also took charge of setting up the Redux store to efficiently manage the application state, fostering seamless interactions among different components. Additionally, I integrated the search feature that retrieves backend data based on user preferences and displays relevant results, while also actively contributing to the resolution of bugs across both frontend and backend systems.
- Ethan Nguyen: I conceptualized wireframes, crafted key interfaces, and developed the Browse page interface and its components. I took charge of developing the Search and Filter functionality but encountered an error in the front end that needed the support of the team for further development. I contributed to detecting backend and frontend bugs through comprehensive testing in each progress. Additionally, I meticulously audited and enhanced the codebase ahead of the final demo and I have also revamped all the pages and elements on the front end so that the interface all align together
- James Ross: I introduced Material UI to the project, and designed much of the UI present within the site, including the home, browse, about pages, pet cards, custom theming, and more. I also handled the deployment of the site to digitalocean, and set up our custom domain alongside the DNS records needed to link it to our deployment.
- Richard Wang: In the frontend, I handled the  implementing login and sign-up functionality, managing user login status and ID tokens, creating sign-up and login pages, a portion of the dashboard, and the profile page. On the backend, I add the user information update feature, the user sign-up function, and get user's list of pets.  I developed the entire website's authentication system, including the JWT verification middleware, as well as the frontend web browsing permissions.

