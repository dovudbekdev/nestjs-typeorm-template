import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseData } from '@common/lib/ResponseData.lib';

export const ApiResponseData = <TModel extends Type<any>>(
  model: TModel,
  status = 200,
  description = 'Successful response',
) => {
  return applyDecorators(
    ApiExtraModels(ResponseData, model),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseData) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
