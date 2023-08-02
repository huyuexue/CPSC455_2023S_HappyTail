# CPSC455_2023S_HappyTail

# Project Description:
Happy Tails is a project focused on creating a pet adoption platform. The website aims to provide a user-friendly interface where users can upload information about pets available for adoption, including cats and dogs. The platform caters to pets that are abandoned, stray, abused, or simply in need of a new home. Happy Tails will store data such as pet profiles, including details such as breed, age, gender, and photos. Users will be able to browse through the available pets, view their profiles, and contact the organization or individual responsible for the pet's adoption.

# Project Requirements:

## Minimal Requirements
1. Each pet has its own information card, which includes:
   -  Photo
   -  Name
   -  Breed
   -  Gender
   -  Age
   -  Size
   -  Altered
   -  House trained
   -  Location
   -  Fur type
   -  Pet personality
   -  Description

2. Search panel
   - user can search for pets that meets his/her need based on given parameters, parameters includes:
     - Age
     - Breed
     - Size
     - Gender
     - Fur type

3. Result page
   - Display all the pet cards with brief information based on customer search parameters
   - Users are able to click on a card to see details regarding any pets

4. Add new pet panel
   - Include all information mentioned in minimum requirement 1, plus contact information such as:
     - Contact name
     - Contact email
     - Contact phone
     - Additional information
   - Specific users(should be the pet information poster after we implement log in) will also be able to edit pet information, and delete the information card as a whole

## Standard
1. Sign up, log in, and log out
   - User will be able to sign up an account
   - User with existing account will be able to log into hie/her account, and safely log out
   - User will be able to edit his/her profile

2. 2 types of users:
   - Pet owner: has a pet/pets looking for adoption
   - Pet adopter: looking to adopt a pet/pets
   - Different users will different dashboard after they log in
   
3. My listing
   - User will be able to add new pets looking for adoption, update and deleter his/her existing lists
   - Users need to have an account as a pet owner and log in if they want to do the above operation.

4. My Favorite
   - User will be able to add pets to his/her favorite list, and delete if they want
   - Users need to have an account as a pet adopter and log in if they want to favorite/un-favorite a pet.

5. Share pet with friend
   - TODO: add some explanation


## Stretch
1. Contact pet owner
   - User will be able to send email to pet owner if he/she is interested in a pet 
   - User will see the contact button on the pet detail card
   - User need to have an account as a pet adopter and log in to do the operation
   - Use external API: emailJS
   
2. Recommender algorithm to show users pets based on his/her search history

## Sketches
![home_page](docs/resources/home_page.png)
![result_page](docs/resources/result_page.png)
![upload_page](docs/resources/upload_page.png)
