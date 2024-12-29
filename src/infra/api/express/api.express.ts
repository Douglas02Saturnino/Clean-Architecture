import express, { Express } from 'express';
import { Api } from '../api';
import { Route } from './routes/route';


express class ApiExpress implements Api {
    
    private app: Express;

    private constructor (routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.addRoutes(routes);
    }
    start(port: number): void {
        throw new Error('Method not implemented.');
    }

    public static create(routes: Route[]){
        return new ApiExpress(routes);
    }

    private addRoutes(routes: Route[]){
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            this.app[method](path, handler);
        })
    }

    public start(port: number){
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes(){
        const routes = this.app._router.stack;

        routes.filter((route: any) => route.route)
        .map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        })

        console.table(routes);
    }
}