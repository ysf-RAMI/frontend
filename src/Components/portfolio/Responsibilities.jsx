import React from "react";
import { School } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Container } from "react-bootstrap";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdGroups } from "react-icons/md";



export default function Responsabilies() {
  const responsibilities = [
    {
      id: 1,
      title: "Coordinateur de Filière Génie Informatique",
      description: [
        "Département Génie Informatique à l'Ecole Supérieure de Technologie à Guelmim",
      ],
      period: "06/2024-présent",
      category: "Coordination",
      color: "#3f51b5",
      icon: <RiUserSettingsLine />,
      animation: "zoom-in-right",
    },
    {
      id: 2,
      title: "Membre au Conseil d'Etablissement",
      description: [
        "Participation active aux décisions stratégiques",
        "Développement de l'établissement",
      ],
      period: "2024-présent",
      category: "Administration",
      color: "#3f51b5",
      icon: <MdGroups />,
      animation: "zoom-in-left",
    },
    {
      id: 3,
      title: "Coordinateur de Modules DUT-Génie Informatique",
      description: [
        "Architecture des Ordinateurs",
        "Réseaux Informatiques",
        "Culture Digitale",
        "Analyse et Conception Orientées Objet avec UML",
      ],
      period: "2022-présent",
      category: "Module",
      color: "#3f51b5",
      icon: <RiUserSettingsLine />,

      animation: "zoom-in-right",
    },
    {
      id: 4,
      title: "Coordinateur DUT-Ingénierie de données",
      description: [
        "Data Mining",
        "Initiation en Machine Learning avec Python",
      ],
      period: "2024-présent",
      category: "Module",
      color: "#3f51b5",
      icon: <RiUserSettingsLine />,
      animation: "zoom-in-left",
    },
    {
      id: 5,
      title: "Coordinateur Licence-Sciences de données",
      description: ["Exploration de données", "Apprentissage Automatique"],
      period: "2024-présent",
      category: "Module",
      color: "#3f51b5",
      icon: <RiUserSettingsLine />,
      animation: "zoom-in-right",
    },
    {
      id: 6,
      title: "Coordinateur Licence-Sécurité Informatique",
      description: ["Administration des Systèmes"],
      period: "2024-présent",
      category: "Module",
      color: "#3f51b5",
    icon: <RiUserSettingsLine />,
      animation: "zoom-in-left",
    },
  ];

  return (
    <section className="responsibilities-section py-5" style={{userSelect:"none",cursor:"pointer",backgroundColor:"rgba(255, 255, 255, 0.09)"}}>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 4, fontWeight: "bold" ,color:"rgb(142, 75, 4)"}}
        >
          Responsabilités Pédagogiques & Tâches Administratives
        </Typography>

        <Grid container spacing={3}>
          {responsibilities.map((r) => (
            <Grid item xs={12} md={6} key={r.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(1px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: "bold", color: r.color }}
                    >
                      {r.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `${r.color}20`,
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {React.cloneElement(r.icon, { sx: { color: r.color } })}
                    </Box>
                  </Box>

                  <List dense disablePadding sx={{ mb: 2 }}>
                    {r.description.map((item, index) => (
                      <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.secondary",
                            sx: {
                              display: "list-item",
                              listStyleType: "disc",
                              ml: 2,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto",
                    }}
                  >
                    <Chip
                      label={r.category}
                      size="small"
                      sx={{ backgroundColor: `${r.color}20`, color: r.color }}
                    />
                    <Typography variant="caption" color="text.secondary" className="">
                      {r.period}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
