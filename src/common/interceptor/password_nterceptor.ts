import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.cleanResponse(data, new WeakSet()))
    );
  }

  private cleanResponse(obj: any, visited: WeakSet<any>): any {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== 'object') return obj;

    // Prevent infinite recursion
    if (visited.has(obj)) return obj;
    visited.add(obj);

    if (typeof obj.toObject === 'function') {
      obj = obj.toObject();
    }

    if (obj._id && typeof obj._id.toString === 'function') {
      obj = { ...obj, _id: obj._id.toString() };
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.cleanResponse(item, visited));
    }

    const newObj: any = {};
    for (const key in obj) {
      if (key === 'password' || key === 'buffer' || key === '__v') {
        continue;
      }
      newObj[key] = this.cleanResponse(obj[key], visited);
    }

    return newObj;
  }
}
