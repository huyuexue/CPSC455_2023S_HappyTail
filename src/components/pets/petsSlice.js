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
