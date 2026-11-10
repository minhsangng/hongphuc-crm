import { useParams } from "react-router-dom";
export default function PostDetail() {
    const { slug } = useParams();
    return (
        <div>
            <h1>Chi tiết bài viết</h1>
            <p>Slug: {slug}</p>
        </div>
    );
}