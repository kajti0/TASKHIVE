namespace projekt_backend.SQLRepository
{
    public interface ISQLRepository
    {
        List<T> GetAllItems<T>();
        List<T> GetAllItemsFromUser<T>();
        T GetSingleItem<T>(int id);
        void Add<T>(T item);
        void AddUserItem<T>(T item);
        void Update<T>(T item);
        void Remove<T>(int id);
    }
}
