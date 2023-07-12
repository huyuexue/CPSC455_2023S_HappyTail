import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState  = {
    list:[
        {id:0,
            spayed: 'yes',
            reason:'moving to another country',
            length:'3 years',
            email:'johnS@gmail.com',
            firstName:'John',
            lastName:'Smith',
            phoneNumber:'778-456-1234',
            postalCode:'123-456',
            city:'Vancouver',
            province:'BC',
            name: "Happy",
            species: 'dog',
            breed: "Labrador",
            gender: "Boy",
            age: '3 years',
            pictureUrl: "https://www.thesprucepets.com/thmb/AUhVkJo7GEsadFm4jevINielAuQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/black-lab-names-5093386-hero-5d14645833114fda9f7e3e620e5e4d67.jpg",
            description : "Very active."
        },
        {id:1,
            spayed: 'yes',
            reason:'N/A',
            length:'2 years',
            email:'leila@gmail.com',
            firstName:'Leila',
            lastName:'White',
            phoneNumber:'778-456-1231',
            postalCode:'123-456',
            city:'Richmond',
            province:'BC',
            name: "Lola",
            species: 'dog',
            breed: "Kooikerhondje",
            gender: "Girl",
            age: '5 years',
            pictureUrl: "https://images.unsplash.com/photo-1587559045816-8b0a54d1fbd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZG9nfGVufDB8fDB8fHww&w=1000&q=80",
            description : "A happy pet."

        },
        {id:2,
            spayed: 'yes',
            reason:'Family issue',
            length:'1 months',
            email:'kai123@gmail.com',
            firstName:'Kai',
            lastName:'Connor',
            phoneNumber:'778-456-4321',
            postalCode:'123-456',
            city:'Vancouver',
            province:'BC',
            name: "Sal",
            species: 'dog',
            breed: "Golden Retriever",
            gender: "Girl",
            age: '4 months',
            pictureUrl: "https://images.unsplash.com/photo-1611003228941-98852ba62227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            description : "A happy pet."

        }
        ],
    sort: 1,
    search: "show all"
}

const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        addPet: {
            reducer: (state, action) => {
                state.list.push(action.payload)
            },
            prepare: ({spayed, reason, length, email, firstName, lastName, phoneNumber, postalCode, city, province,
                      name, species, breed,gender,age, pictureUrl, description}) => {
                return {
                    payload: {
                        id: nanoid(),
                        spayed, reason, length, email, firstName, lastName, phoneNumber, postalCode, city, province,
                        name,
                        species,
                        breed,
                        gender,
                        age,
                        pictureUrl,
                        description
                    }
                }
            }
        },
        deletePet: {
            reducer: (state, action) => {
                const itemId = action.payload;
                state.list = state.list.filter((item)=> item.id !== itemId)
            }
        },
        updatePet: {
            reducer: (state, action) => {
                const petId = action.payload.id;
                const index = state.list.findIndex((pet)=> pet.id === petId);
                const newList = [...state.list];
                newList[index].phoneNumber = action.payload.phone;
                newList[index].email = action.payload.email;
                state.list = newList;
            },
            prepare: (id,phone, email) => {
                return {
                    payload: {
                        id: id,
                        phone, email
                    }
                }
            }

        }
    }
});

export default petsSlice.reducer;
export const {addPet,deletePet, updatePet} = petsSlice.actions;
export const petsState = (state) => state.pets;
