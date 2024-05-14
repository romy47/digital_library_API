import { DefaultConfig } from './config';
import { createServer } from './server';


async function main(): Promise<void> {
    const app = await createServer();
    app.listen(DefaultConfig.port, () => {
        console.log("Express App running on port " + DefaultConfig.port)
    });
}

main()
