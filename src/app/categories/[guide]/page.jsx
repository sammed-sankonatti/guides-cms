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
    <Container sx={{ py: 3, display: "flex", gap: 2 }}>
      <Box>
        <h1>{name.split("-").join(" ")}</h1>
        <Box justifyContent="center" display={"flex"}>
          {categoriesWithArticles.map((item, index) => (
            <Box key={index} padding="0 1rem ">
              <Typography variant="h6" fontWeight="bold">
                {item.name}
              </Typography>
              <List sx={{ display: "flex", flexDirection: "column" }}>
                {item.articles.map((article, index) => (
                  <Link
                    href={`/content/${article.id}_${article.title
                      .split(" ")
                      .join("-")}`}
                    key={index}
                  >
                    <Typography variant="p">{article.title}</Typography>
                  </Link>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default page;

// https://cms.drillbitplagiarismcheck.com/hr/cms/documents/1/2
