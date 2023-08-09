import {Grid} from "@mui/material";
import React from "react";
import BlogPostCard from "./BlogPostCard";

export default function BlogPosts() {
    return (
        <Grid container spacing={8} justifyContent="center">
            <Grid item sm={4}>
                <BlogPostCard name={"Adoption Guide"}
                              link={"https://www.petfinder.com/adopt-or-get-involved/adopting-pets/how-to/the-pet-adoption-guide/"}
                              image={"https://www.petfinder.com/static/5fba39cac3d723abe37493b2f1e397fe/b84a9/pet-adoption-guide_640x428%20(1).webp"}
                              desc={"The comprehensive guide to adopting a pet"}></BlogPostCard>
            </Grid>
            <Grid item sm={4}>
                <BlogPostCard name={"Why Adopt a Pet"}
                              link={"https://www.torontohumanesociety.com/the-benefits-of-adopting-a-pet-instead-of-buying-one-from-online-marketplaces/"}
                              image={"https://www.torontohumanesociety.com/wp-content/uploads/2023/03/1-1.png"}
                              desc={"The benefits of adopting a pet instead of buying one from online marketplaces"}></BlogPostCard>
            </Grid>
            <Grid item sm={4}>
                <BlogPostCard name={"COVID Resources"}
                              link={"https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/animals-covid-19.html"}
                              image={"https://www.aspca.org/sites/default/files/how-you-can-help_adoptions-tips_main-image-dog.jpg"}
                              desc={"Caring for a companion animal goes far beyond providing food, water and shelter. "}></BlogPostCard>
            </Grid>
        </Grid>
    );
}