export const searchTermDefination = (searchTerm: string) => {
    const filter = {
        $or: [
            {
                location: { $regex: searchTerm as string, $options: 'i' }
            },
            {
                breed: { $regex: searchTerm as string, $options: 'i' }
            },
            {
                category: { $regex: searchTerm as string, $options: 'i' }
            }
        ]
    };
    
    return filter;
}