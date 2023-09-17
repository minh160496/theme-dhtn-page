import styles from "@/styles/TextScroll.module.css";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";

export const TextScroll = ({ list }: { list?: string[] }) => {
  const listInf = list || [];
  return (
    <Box className={styles["m-scroll"]}>
      <Box className={styles["m-scroll__title"]}>
        <Box className={styles["items"]}>
          <UnorderedList className={styles["item"]}>
            {listInf.map((item, index) => (
              <ListItem
                key={index}
                display={"inline"}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight={600}
                mr={{ base: "16px", md: "24px", lg: "48px" }}
              >
                {item}
              </ListItem>
            ))}
          </UnorderedList>
          <UnorderedList className={styles["item"]}>
            {listInf.map((item, index) => (
              <ListItem
                key={index}
                display={"inline"}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight={600}
                mr={{ base: "16px", md: "24px", lg: "48px" }}
              >
                {item}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
    </Box>
  );
};
