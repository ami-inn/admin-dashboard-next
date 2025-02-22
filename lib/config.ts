

const config = {
    env:{

        apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndPoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,

        imageKit:{
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL!
        },
        databaseUrl: process.env.DATABASE_URL!,
        upstash:{
            redisUrl : process.env.UPSTASH_REDIS_URL!,
            token: process.env.UPSTASH_REDIS_TOKEN!,
            qstashUrl: process.env.UPSTASH_QSTASH_URL!,
            qstashToken: process.env.UPSTASH_QSTASH_TOKEN!  
        }


    }
}


export default config;