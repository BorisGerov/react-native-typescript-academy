import { NumberIdGenerator, Repository, RepositoryInMemoryImpl } from "./repository.js";
import { IdType } from "./shared-types.js";

export class PostCreateDto {
    constructor(
        public title: string,
        public content: string,
        public tags: string[],
        public imageUrl: string,
        public authorId: IdType
    ) { }
}

export class Post extends PostCreateDto{
    constructor(
        public id: IdType,
        title: string,
        content: string,
        tags: string[],
        imageUrl: string,
        authorId: IdType
    ) {
        super(title, content, tags, imageUrl, authorId);
    }
}

export interface PostRepository extends Repository<IdType, Post> {
    findByTags(searchTags: string[]): Post[];
    findByTitlePart(titlePart: string): Post[];
    findByAuthorId(authorId: IdType): Post[];
}

export class PostRepositoryImpl extends RepositoryInMemoryImpl<IdType, Post> implements PostRepository {
    findByTags(searchTags: string[]): Post[] {
        return this.findAll().filter(post => post.tags.some(tag => searchTags.includes(tag)));
    }
    findByTitlePart(titlePart: string): Post[] {
        return this.findAll().filter(post => post.title.includes(titlePart));
    }
    findByAuthorId(authorId: number): Post[] {
        return this.findAll().filter(post => post.authorId === authorId);
    }
}

const SAMPLE_POST = [
    new Post(0, "New in Typescript","Typescript becomes stricter ...", ['typescript','novelties'],"https://dz2cdn1.dzone.com/storage/temp/8746383-json-server.png",1),
    new Post(0, "New in Typescript","EcmaScript becomes stricter ...", ['es','js'],"https://res.cloudinary.com/practicaldev/image/fetch/s--Iz3e8EkG--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/azhvn8vuqrofsidykaas.jpg",1),
    new Post(0, "New in Typescript","AsyncComposition becomes stricter ...", ['async','ajax'],"http://doctorakil.com/wp-content/uploads/2018/01/coffee-940x600.jpg",1)
]

function testPostrepository() {
    const postRepo: PostRepository = new PostRepositoryImpl(new NumberIdGenerator());
    SAMPLE_POST.forEach(post => postRepo.create(post));
    postRepo.findAll().forEach(post => console.log(post));
    console.log('Find by Tags: ');
    postRepo.findByTags(['es']).forEach(post => console.log(post));
    console.log('Find by Title: ');
    postRepo.findByTitlePart('New').forEach(post => console.log(post));
}

testPostrepository();