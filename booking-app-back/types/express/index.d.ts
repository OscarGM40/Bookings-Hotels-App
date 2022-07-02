// parece que no quiere el declare global(porqué??)
namespace Express { // fijate que es Express y no express
  export interface Request {
    user?: Payload;
  }
}
type Payload = {
  id: string;
  isAdmin: boolean;
}