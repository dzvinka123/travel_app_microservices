import axios from "axios";

const baseUrl = 'http://localhost:3001';

const createTravelCard = async (from, to, startDate, endDate, emails, tasks) => {
  try {
    const response = await axios.post(`${baseUrl}/add-travel-card`, {
      from,
      to,
      start_date: startDate,
      end_date: endDate,
      emails,
      tasks
    });
    console.log('Travel card created:', response.data);
  } catch (error) {
    console.error('Error creating travel card:', error.response ? error.response.data : error.message);
  }
};

const sampleData = [
  {
    from: 'New York',
    to: 'Los Angeles',
    start_date: '2024-06-01',
    end_date: '2024-06-10',
    emails: ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com'],
    tasks: ['Book flights', 'Reserve hotel', 'Pack bags']
  },
  {
    from: 'San Francisco',
    to: 'Chicago',
    start_date: '2024-07-05',
    end_date: '2024-07-15',
    emails: ['user1@gmail.com', 'user2@gmail.com'],
    tasks: ['Arrange transportation', 'Confirm reservations', 'Pack essentials']
  },
  {
    from: 'Miami',
    to: 'Boston',
    start_date: '2024-08-10',
    end_date: '2024-08-20',
    emails: ['user3@gmail.com'],
    tasks: ['Book accommodation', 'Plan itinerary', 'Pack documents']
  }
];

const populateDatabase = async () => {
  for (const card of sampleData) {
    await createTravelCard(
      card.from,
      card.to,
      card.start_date,
      card.end_date,
      card.emails,
      card.tasks
    );
  }
};

const getUserTravelCards = async (email) => {
  try {
    const response = await axios.get(`${baseUrl}/user-travel-cards?email=${email}`);
    console.log('Travel cards and todo-lists for', email, ':', response.data.travelCards);
  } catch (error) {
    console.error('Error fetching travel cards for', email, ':', error.response ? error.response.data : error.message);
  }
};

const main = async () => {
  await populateDatabase();

  await getUserTravelCards('user1@gmail.com');
  await getUserTravelCards('user2@gmail.com');
  await getUserTravelCards('user3@gmail.com');
};

main();
