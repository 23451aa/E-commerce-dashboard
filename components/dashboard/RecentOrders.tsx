import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

const recentOrders = [
  {
    id: '#12345',
    customer: 'John Doe',
    status: 'Completed',
    amount: '$299.99',
    date: '2024-01-15',
  },
  {
    id: '#12346',
    customer: 'Jane Smith',
    status: 'Processing',
    amount: '$159.50',
    date: '2024-01-15',
  },
  {
    id: '#12347',
    customer: 'Bob Johnson',
    status: 'Shipped',
    amount: '$89.99',
    date: '2024-01-14',
  },
  {
    id: '#12348',
    customer: 'Alice Brown',
    status: 'Pending',
    amount: '$199.99',
    date: '2024-01-14',
  },
  {
    id: '#12349',
    customer: 'Charlie Wilson',
    status: 'Completed',
    amount: '$449.99',
    date: '2024-01-13',
  },
];

const statusColors = {
  Completed: 'bg-green-100 text-green-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-purple-100 text-purple-800',
  Pending: 'bg-yellow-100 text-yellow-800',
};

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                  {order.status}
                </Badge>
                <p className="font-medium text-gray-900">{order.amount}</p>
                <p className="text-sm text-gray-600">{order.date}</p>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}