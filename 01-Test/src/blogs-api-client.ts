import { User } from "./users.js";
import { IdType } from "./shared-types.js";

const API_BASE_URL = "http://localhost:4000/api/posts";

export interface BlogsApiClient {
    getAllPosts(): Promise<User[]>;
    getPostById(id: IdType): Promise<User>;
    addNewPost(post: PostCreateDto): Promise<User>;
    updatePost(post: User): Promise<User>;
    deletePostById(id: IdType): Promise<User>;
}

class BlogApiClientImpl implements BlogsApiClient {

    async getAllPosts(): Promise<User[]> {
        return this.handleRequest(API_BASE_URL);
    }

    async getPostById(id: number): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${id}`);
    }

    async addNewPost(post: PostCreateDto): Promise<User> {
        return this.handleRequest(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async updatePost(post: User): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${post.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    }

    async deletePostById(id: number): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
    }

    private async handleRequest(url: string, options?: RequestInit) {
        try {
            const postsResp = await fetch(url, options);
            if (postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export const BlogsAPI: BlogsApiClient = new BlogApiClientImpl();

