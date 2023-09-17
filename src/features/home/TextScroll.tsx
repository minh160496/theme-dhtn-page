import styles from "@/styles/TextScroll.module.css";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";

export const TextScroll = () => {
  return (
    <Box className={styles["m-scroll"]}>
      <Box className={styles["m-scroll__title"]}>
        <Box className={styles["items"]}>
          <UnorderedList className={styles["item"]}>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Hà Nội: 15/10
            </ListItem>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Thái Nguyên: 08/10
            </ListItem>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Hồ Chí Minh: 01/10
            </ListItem>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Đà Nẵng: 09/10
            </ListItem>
          </UnorderedList>
          <UnorderedList className={styles["item"]}>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Hà Nội: 15/10
            </ListItem>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Thái Nguyên: 08/10
            </ListItem>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Hồ Chí Minh: 01/10
            </ListItem>
            <ListItem
              display={"inline"}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mr={{ base: "16px", md: "24px", lg: "48px" }}
            >
              Lịch khai giảng tại Đà Nẵng: 09/10
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </Box>
  );
};
