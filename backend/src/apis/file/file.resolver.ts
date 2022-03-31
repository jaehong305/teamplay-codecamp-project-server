import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => [String])
  async uploadFile(@Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[]) {
    console.log(files);
    return await this.fileService.upload({ files });
  }
}
