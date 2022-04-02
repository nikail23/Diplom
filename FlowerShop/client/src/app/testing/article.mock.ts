import { ArticlesService } from "src/app/services/articles.service";
import { articles } from "../classes/article";

export const articleServiceSpy = jasmine.createSpyObj<ArticlesService>('ArticlesService', ['get', 'getAll']);
articleServiceSpy.get.and.returnValue(articles[0]);
articleServiceSpy.getAll.and.returnValue(articles);
