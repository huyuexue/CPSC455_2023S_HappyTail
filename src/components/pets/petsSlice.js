import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState  = {
    list:[
        {id:0,
            name: "Happy",
            species: 'dog',
            breed: "Lab",
            gender: "Girl",
            age: 3,
            pictureUrl: "https://www.thesprucepets.com/thmb/AUhVkJo7GEsadFm4jevINielAuQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/black-lab-names-5093386-hero-5d14645833114fda9f7e3e620e5e4d67.jpg",
            description : "A happy girl."
        },
        {id:1,
            name: "Lola",
            species: 'dog',
            breed: "Lab",
            gender: "Girl",
            age: 5,
            pictureUrl: "https://images.unsplash.com/photo-1587559045816-8b0a54d1fbd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZG9nfGVufDB8fDB8fHww&w=1000&q=80",
            description : "A happy pet."

        },
        {id:2,
            name: "Sal",
            species: 'dog',
            breed: "Lab",
            gender: "Girl",
            age: 5,
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
                console.log(state.list[1].image)
            },
            prepare: (name, species, breed,gender,age, pictureUrl, description) => {
                return {
                    payload: {
                        id: nanoid(),
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
        }
    }
});

export default petsSlice.reducer;
export const {addPet} = petsSlice.actions;
export const petsState = (state) => state.pets;
