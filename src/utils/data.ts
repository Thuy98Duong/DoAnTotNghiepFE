import { ItemType } from "@/components/dropdown";
import { PostPrimary, PostType } from "./contants";

export const dropdownCreatePostItems: ItemType[] = [
  {
    label: "Mọi người",
    key: PostPrimary.PUBLIC,
  },
  {
    label: "Bạn bè",
    key: PostPrimary.FRIEND,
  },
];

export const dropdownCreateDiscusionItems: ItemType[] = [
    {
      label: "Hỏi đáp nhà trường",
      key: PostType.School,
    },
    {
      label: "Hỏi đáp học tập",
      key: PostType.Study,
    },
  ];
