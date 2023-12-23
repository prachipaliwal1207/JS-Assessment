# Data Preparation
persons = [
    {"name": "Alice", "age": 28, "city": "New York"},
    {"name": "Bob", "age": 22, "city": "India"},
    {"name": "Charlie", "age": 30, "city": "USA"},
]

#Filtering
filtered_persons = [person for person in persons
                    if person["age"] >= 25]

# Sorting
sorted_persons = sorted(filtered_persons, 
                        key=lambda x: x["city"])

# Output
print(":ist of persons:")
for person in sorted_persons:
    print(f"Name: {person['name']}, Age: {person['age']}, City: {person['city']}")