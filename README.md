# CPSC455_2023S_HappyTail

# Project Description:
Happy Tails is a project focused on creating a pet adoption platform. The website aims to provide a user-friendly interface where users can upload information about pets available for adoption, including cats and dogs. The platform caters to pets that are abandoned, stray, abused, or simply in need of a new home. Happy Tails will store data such as pet profiles, including details such as breed, age, gender, and photos. Users will be able to browse through the available pets, view their profiles, and contact the organization or individual responsible for the pet's adoption.

# Project Requirements:

## Minimal Requirements
1. Pet adoption database (Creating database, linking to backend)
  - Name
  - Species
  - Description
  - Date of Birth
  - Sex
  - Medical Information
  - Location
  - Contact email?
  - Images of pets
  - [Contingent on users table] poster userid
  - For now, data will be immutable once uploaded and can only be edited / deleted by an administrator. If logins are introduced we can adjust this. Only creation of new records for now

2. Search form
  - Allow users to search the pet database for pets that match what they’re looking for
3. Uploading Form
  - Allow users to upload the information / create new entries within the pet adoption database
4. “Results” page
  - Display search results and all the pets that come up in cards
  - Adoption for internal pets
      - An adopt button sends an email to the contact of the pet, maybe it just introduces the person clicking the button and the person who posted the entry?
## Standard
1. Users Table
  - Userid
  - Email
  - [Shortlist]
2. My Pets
  - Users should be able to view a sub-page where they can see pets they have uploaded, and adjust their listings 
3. Shortlists
  - Allow users to favourite / shortlist pets to view later
4. Pet Crawling
  - Automated webscraping to find pets from certain adoption sites
5. Adopt Button
  - Direct users to instructions on adopting a certain pet they find
  - May direct users to the external adoption form
## Stretch
1. Recommender algorithm to show users pets 
2. Automate the sending of “My Profile” to adoption clinics to allow users to adopt pets without ever leaving the site
## Sketches
![home_page](docs/resources/home_page.png)
![result_page](docs/resources/result_page.png)
![upload_page](docs/resources/upload_page.png)
