import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import styles from "@/styles/TextScroll.module.css";

export const TextScroll = ({ list }: { list?: string[] }) => {
  const listInf = list || [];
  return (
    <Box
      className={styles["m-scroll"]}
      css={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "70px",
        background:
          "linear-gradient(70deg, rgba(246, 137, 32, 1), rgba(252, 89, 52, 1) 100%)",
        overflow: "hidden",
        zIndex: 5,
      }}
    >
      <Box
        className={styles["m-scroll__title"]}
        css={{
          display: "flex",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          alignIitems: "center",
          width: "100%",
          height: "100%",
          whiteSpace: "nowrap",
          transition: "all 1s ease",
        }}
      >
        <Box
          className={styles["items"]}
          css={{ display: "flex", animation: "scrollText 15s infinite linear" }}
        >
          <UnorderedList
            className={styles["item"]}
            css={{
              margin: 0,
              color: "rgba(255, 255, 255, 1)",
              transition: "all 2s ease",
            }}
          >
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
          <UnorderedList
            className={styles["item"]}
            css={{
              margin: 0,
              color: "rgba(255, 255, 255, 1)",
              transition: "all 2s ease",
            }}
          >
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
