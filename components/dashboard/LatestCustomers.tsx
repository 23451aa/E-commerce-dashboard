import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const latestCustomers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    joinedDate: '2024-01-15',
    initials: 'SJ',
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    joinedDate: '2024-01-14',
    initials: 'MC',
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    joinedDate: '2024-01-13',
    initials: 'ED',
  },
  {
    name: 'David Wilson',
    email: 'david.w@email.com',
    joinedDate: '2024-01-12',
    initials: 'DW',
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    joinedDate: '2024-01-11',
    initials: 'LA',
  },
];

export default function LatestCustomers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Customers</CardTitle>
        <Button variant="outline" size="sm">
          View All Customers
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {latestCustomers.map((customer) => (
            <div
              key={customer.email}
              className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {customer.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{customer.name}</p>
                <p className="text-sm text-gray-600">{customer.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Joined</p>
                <p className="text-sm font-medium text-gray-900">
                  {customer.joinedDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}