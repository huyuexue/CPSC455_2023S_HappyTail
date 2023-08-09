import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";

export default function BlogPostCard({name, image, link, desc}) {

    return (
        <>
            <Card className="blog-card" sx={{maxWidth: 345}}>
                <CardActionArea onClick={() => window.open(link)}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={image}
                        alt={name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {desc},
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}