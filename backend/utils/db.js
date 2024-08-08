const dbCon = async () => {
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                connectTimeoutMS: 60000,
                socketTimeoutMS: 60000,
            });
            console.log("Database Connected Successfully");
            break; // Exit loop if connection is successful
        } catch (error) {
            attempt++;
            console.log(`Connection attempt ${attempt} failed. Retrying in ${attempt * 2} seconds...`);
            await new Promise(resolve => setTimeout(resolve, attempt * 2000)); // Exponential backoff
        }
    }
    if (attempt === maxRetries) {
        console.log("Failed to connect to the database after multiple attempts.");
    }
};
