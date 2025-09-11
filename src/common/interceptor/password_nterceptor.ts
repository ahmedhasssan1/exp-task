import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => this.cleanResponse(data, new WeakSet())));
  }

private cleanResponse(obj: any, visited: WeakSet<any>): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;

  if (visited.has(obj)) return obj;
  visited.add(obj);

  // Convert Date to string
  if (obj instanceof Date) return obj.toISOString();

  // Mongoose document
  if (typeof obj.toObject === 'function') {
    obj = obj.toObject();
  }

  // TypeORM entity
  if (obj.constructor && obj.constructor.name !== 'Object') {
    obj = instanceToPlain(obj);
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => this.cleanResponse(item, visited));
  }

  const newObj: any = {};
  const SENSITIVE_KEYS = ['password', 'buffer', '__v'];
  for (const key in obj) {
    if (SENSITIVE_KEYS.includes(key)) continue;
    newObj[key] = this.cleanResponse(obj[key], visited);
  }

  return newObj;
}

}
