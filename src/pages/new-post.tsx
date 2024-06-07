import { useState } from 'react';
const NewPost = () => {
    const [data, setData] = useState<{
        title: string;
        content: string;
        image: string | null;
    }>({
        title: '',
        content: '',
        image: null,
    });

    return (
        <div>
            <h1>New Post</h1>
            <input
                type="text"
                name="title"
                onChange={(e) => {
                    setData({ ...data, title: e.target.value });
                }}
            />
            <textarea name="content" rows={3} />
            <input type="file" name="image" />
            <button>Submit</button>
        </div>
    );
};

export default NewPost;
