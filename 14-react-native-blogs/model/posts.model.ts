import { IdType, ImageData } from "./shared-types.js";

export enum PostStatus {
    Published = 1, Draft
}

export class ImageClass {
    constructor(
        public title: string,
        public image: ImageData,
        public tags: string[],
        public description?: string,      
        public authorName?: string,
        public status: PostStatus = PostStatus.Published,
        public id: IdType = undefined,
        public deadline = new Date().toDateString(),

    ) {
        // super(title, content, tags, imageUrl, authorId);
    }
}
