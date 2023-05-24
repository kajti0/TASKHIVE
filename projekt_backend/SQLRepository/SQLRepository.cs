using projekt_backend.Services;
using projekt_backend.SQLRepository;
using System.Data;
using System.Data.SQLite;
using System.Reflection;

namespace projekt_backend.SQLRepository
{
    public class SQLRepository : ISQLRepository
    {
        readonly string _connectionString = @"Data Source=..\projekt_backend\Database\projekt_database.db;";
        private readonly ICurrentUserService _currentUserService;

        public SQLRepository(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public List<T> GetAllItems<T>()
        {
            var items = new List<T>();
            var tableName = GetTableName<T>();
            using (var connection = new SQLiteConnection(_connectionString))
            {
                connection.Open();

                using var command = new SQLiteCommand($"SELECT * FROM {tableName}", connection);
                using var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var item = CreateObjectFromRow<T>(reader);
                    items.Add(item);
                }
            }

            return items;
        }

        public List<T> GetAllItemsFromUser<T>()
        {
            var items = new List<T>();
            var tableName = GetTableName<T>();
            var userId = _currentUserService.GetCurrentUserId();
            using (var connection = new SQLiteConnection(_connectionString))
            {
                connection.Open();

                using var command = new SQLiteCommand($"SELECT * FROM {tableName} WHERE UserId = {userId}", connection);
                using var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var item = CreateObjectFromRow<T>(reader);
                    items.Add(item);
                }
            }

            return items;
        }

        public T GetSingleItem<T>(int id)
        {
            var tableName = GetTableName<T>();
            using var connection = new SQLiteConnection(_connectionString);
            connection.Open();

            using var command = new SQLiteCommand($"SELECT * FROM {tableName} WHERE Id = @Id", connection);
            command.Parameters.AddWithValue("@Id", id);

            using var reader = command.ExecuteReader();
            if (reader.Read())
            {
                return CreateObjectFromRow<T>(reader);
            }
            else
            {
                throw new ArgumentException("Table does not have an Id property.");
            }
        }

        private static T CreateObjectFromRow<T>(IDataRecord row)
        {
            var obj = Activator.CreateInstance<T>();

            for (int i = 0; i < row.FieldCount; i++)
            {
                var property = typeof(T).GetProperty(row.GetName(i));
                if (property != null && !row.IsDBNull(i))
                {
                    property.SetValue(obj, Convert.ChangeType(row[i], property.PropertyType));
                }
            }

            return obj;
        }

        public void Add<T>(T item)
        {
            var tableName = GetTableName<T>();
            using var connection = new SQLiteConnection(_connectionString);
            connection.Open();

            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var columns = string.Join(", ", properties.Select(p => p.Name));
            var values = string.Join(", ", properties.Select(p => $"@{p.Name}"));
            var sql = $"INSERT INTO {tableName} ({columns}) VALUES ({values})";

            using var command = new SQLiteCommand(sql, connection);
            foreach (var property in properties)
            {
                var parameter = new SQLiteParameter($"@{property.Name}", property.GetValue(item));
                command.Parameters.Add(parameter);
            }

            command.ExecuteNonQuery();
        }

        public void AddUserItem<T>(T item)
        {
            var tableName = GetTableName<T>();
            using var connection = new SQLiteConnection(_connectionString);
            connection.Open();

            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var columns = string.Join(", ", properties.Select(p => p.Name));
            var values = string.Join(", ", properties.Select(p => $"@{p.Name}"));
            var userId = _currentUserService.GetCurrentUserId();
            var sql = $"INSERT INTO {tableName} ({columns}, UserId) VALUES ({values}, {userId})";

            using var command = new SQLiteCommand(sql, connection);
            foreach (var property in properties)
            {
                var parameter = new SQLiteParameter($"@{property.Name}", property.GetValue(item));
                command.Parameters.Add(parameter);
            }

            command.ExecuteNonQuery();
        }

        public void Update<T>(T item)
        {
            var tableName = GetTableName<T>();
            using var connection = new SQLiteConnection(_connectionString);
            connection.Open();

            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var setClause = string.Join(", ", properties.Select(p => $"{p.Name} = @{p.Name}"));
            var idProperty = properties.FirstOrDefault(p => p.Name == "Id");
            if (idProperty == null)
            {
                throw new ArgumentException("Item does not have an Id property.");
            }
            var sql = $"UPDATE {tableName} SET {setClause} WHERE Id = @Id";

            using var command = new SQLiteCommand(sql, connection);
            foreach (var property in properties)
            {
                var parameter = new SQLiteParameter($"@{property.Name}", property.GetValue(item));
                command.Parameters.Add(parameter);
            }
            command.Parameters.AddWithValue("@Id", idProperty.GetValue(item));

            command.ExecuteNonQuery();
        }

        public void Remove<T>(int id)
        {
            var tableName = GetTableName<T>();
            using var connection = new SQLiteConnection(_connectionString);
            connection.Open();

            var sql = $"DELETE FROM {tableName} WHERE Id = @Id";

            using var command = new SQLiteCommand(sql, connection);
            var parameter = new SQLiteParameter("@Id", id);
            command.Parameters.Add(parameter);

            command.ExecuteNonQuery();
        }

        private static string GetTableName<T>()
        {
            var tableName = typeof(T).Name;
            if (tableName.StartsWith("New"))
            {
                tableName = tableName[3..];
            }
            if (tableName.EndsWith("Dto"))
            {
                tableName = tableName[0..^3];
            }
            tableName += "s";
            return tableName;
        }
    }
}
