import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React from "react";

const getCategories = async (id) => {
  try {
    const res = await axios.get(
      `https://cms.drillbitplagiarismcheck.com/hr/categories/${id}`
    );
    return res.data;
  } catch (error) {
    return [];
  }
};

const getArticles = async (guideId, categoryId) => {
  const res = await axios.get(
    `https://cms.drillbitplagiarismcheck.com/hr/cms/documents/${guideId}/${categoryId}`
  );
  console.log("response = ", res.data);

  return res.data;
};

const page = async ({ params }) => {
  const { guide } = await params;

  console.log("guide", guide);
  const [id, name] = guide.split("_");
  console.log("name = ", name);

  const categories = await getCategories(+id);

  const categoriesWithArticles = await Promise.all(
    categories.map(async (category) => {
      const articles = await getArticles(+id, category.id);
      return { ...category, articles };
    })
  );

  console.log("categoriesWithArticles = ", categoriesWithArticles);

  return (
    <Box sx={{ px: 6, py: 3, display: "flex" }}>
      <Box>
        <h1>{name.split("-").join(" ")}</h1>
        <Box justifyContent="center" display={"flex"}>
          <Grid container>
            {categoriesWithArticles.map((item, index) => (
              <Grid item md={3} lg={4} key={index}>
                <Box key={index} padding="0 1rem ">
                  <Typography variant="h6" color="#003C46" fontWeight="700">
                    {item.name}
                  </Typography>
                  <List sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "20rem",
                      }}
                    >
                      {item.articles.slice(0, 7).map((article, index) => (
                        <Link
                          href={`/content/${article.id}_${article.title
                            .split(" ")
                            .join("-")}`}
                          key={index}
                        >
                          <Typography
                            variant="p"
                            fontSize={"0.95rem"}
                            lineHeight={"1.5 !important"}
                            fontWeight={400}
                            color="rgba(0, 109, 186, 1)"
                            my={"1rem"}
                          >
                            {article.title}
                          </Typography>
                        </Link>
                      ))}
                      {item.articles.length !== 0 && (
                        <Link href="/" style={{ margin: "2rem 0" }}>
                          <Typography
                            variant="p"
                            fontSize={"0.95rem"}
                            lineHeight={"1.5 !important"}
                            fontWeight={600}
                            color="rgba(0, 109, 186, 1)"
                          >
                            View More on {item.name} →
                          </Typography>
                        </Link>
                      )}
                    </Box>
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default page;

// https://cms.drillbitplagiarismcheck.com/hr/cms/documents/1/2
