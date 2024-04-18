import PopularPostRead from "@/domain/PopulatPostRead";
import axios from "axios";

export default async function getPopularPosts() {
  try {
    const response = await axios.get<{
      success: boolean;
      message: string;
      data: {
        posts: PopularPostRead[];
      };
    }>("http://localhost:3000/posts?sortBy=recent");

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message as string,
      data: null,
    };
  }
}
