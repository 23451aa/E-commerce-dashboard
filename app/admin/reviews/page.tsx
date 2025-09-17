// 'use client';

// import { useState, useMemo } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { 
//   Search, 
//   Star, 
//   Package,
//   MessageSquare,
//   CheckCircle,
//   XCircle,
//   Filter,
//   Download
// } from 'lucide-react';
// import { format } from 'date-fns';

// // Mock reviews data
// const initialReviews = [
//   {
//     id: '1',
//     productId: 'PROD-001',
//     productTitle: 'Premium Wireless Headphones',
//     productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 5,
//     customerName: 'John Doe',
//     customerEmail: 'john.doe@email.com',
//     reviewDate: '2024-01-15T10:30:00Z',
//     reviewText: 'Absolutely amazing headphones! The sound quality is incredible and the noise cancellation works perfectly. Highly recommend for anyone looking for premium audio experience.',
//     isApproved: true,
//   },
//   {
//     id: '2',
//     productId: 'PROD-002',
//     productTitle: 'Organic Face Moisturizer',
//     productImage: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 4,
//     customerName: 'Jane Smith',
//     customerEmail: 'jane.smith@email.com',
//     reviewDate: '2024-01-14T15:45:00Z',
//     reviewText: 'Great moisturizer for sensitive skin. It absorbs quickly and doesn\'t leave any greasy residue. The only downside is the price, but the quality justifies it.',
//     isApproved: false,
//   },
//   {
//     id: '3',
//     productId: 'PROD-003',
//     productTitle: 'Smart Fitness Tracker Watch',
//     productImage: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 3,
//     customerName: 'Bob Johnson',
//     customerEmail: 'bob.johnson@email.com',
//     reviewDate: '2024-01-13T09:15:00Z',
//     reviewText: 'The fitness tracker is okay. Battery life is good and it tracks steps accurately, but the heart rate monitor seems inconsistent. Could be better for the price.',
//     isApproved: true,
//   },
//   {
//     id: '4',
//     productId: 'PROD-004',
//     productTitle: 'Eco-Friendly Yoga Mat',
//     productImage: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 5,
//     customerName: 'Alice Brown',
//     customerEmail: 'alice.brown@email.com',
//     reviewDate: '2024-01-12T14:20:00Z',
//     reviewText: 'Perfect yoga mat! Great grip, comfortable thickness, and I love that it\'s eco-friendly. The material feels premium and it\'s easy to clean. Will definitely buy again.',
//     isApproved: true,
//   },
//   {
//     id: '5',
//     productId: 'PROD-005',
//     productTitle: 'Gourmet Coffee Beans',
//     productImage: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 2,
//     customerName: 'Charlie Wilson',
//     customerEmail: 'charlie.wilson@email.com',
//     reviewDate: '2024-01-11T11:30:00Z',
//     reviewText: 'Expected much better quality for the price. The coffee tastes burnt and lacks the rich flavor described. Packaging was nice but the product itself was disappointing.',
//     isApproved: false,
//   },
//   {
//     id: '6',
//     productId: 'PROD-006',
//     productTitle: 'Luxury Silk Scarf',
//     productImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 4,
//     customerName: 'Diana Martinez',
//     customerEmail: 'diana.martinez@email.com',
//     reviewDate: '2024-01-10T16:45:00Z',
//     reviewText: 'Beautiful scarf with excellent quality silk. The colors are vibrant and the pattern is elegant. Slightly smaller than expected but still very satisfied with the purchase.',
//     isApproved: true,
//   },
// ];

// export default function ReviewManagementPage() {
//   const [reviews, setReviews] = useState(initialReviews);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [ratingFilter, setRatingFilter] = useState('all');
//   const [approvalFilter, setApprovalFilter] = useState('all');
//   const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Filter and sort reviews
//   const filteredAndSortedReviews = useMemo(() => {
//     let filtered = reviews.filter((review) => {
//       const matchesSearch = searchTerm === '' || 
//         review.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         review.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         review.reviewText.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesRating = ratingFilter === 'all' || 
//         review.rating.toString() === ratingFilter;

//       const matchesApproval = approvalFilter === 'all' || 
//         (approvalFilter === 'approved' && review.isApproved) ||
//         (approvalFilter === 'pending' && !review.isApproved);

//       return matchesSearch && matchesRating && matchesApproval;
//     });

//     // Sort reviews
//     filtered.sort((a, b) => {
//       if (sortBy === 'date') {
//         return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
//       } else {
//         return b.rating - a.rating;
//       }
//     });

//     return filtered;
//   }, [reviews, searchTerm, ratingFilter, approvalFilter, sortBy]);

//   // Paginate reviews
//   const totalPages = Math.ceil(filteredAndSortedReviews.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedReviews = filteredAndSortedReviews.slice(startIndex, startIndex + itemsPerPage);

//   const toggleApproval = (reviewId: string) => {
//     setReviews(reviews.map(review => 
//       review.id === reviewId ? { ...review, isApproved: !review.isApproved } : review
//     ));
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`h-4 w-4 ${
//           index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   const resetFilters = () => {
//     setSearchTerm('');
//     setRatingFilter('all');
//     setApprovalFilter('all');
//     setSortBy('date');
//     setCurrentPage(1);
//   };

//   // Calculate statistics
//   const totalReviews = reviews.length;
//   const approvedReviews = reviews.filter(r => r.isApproved).length;
//   const pendingReviews = reviews.filter(r => !r.isApproved).length;
//   const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
//           <p className="text-gray-600 mt-2">
//             Manage customer reviews and ratings for products.
//           </p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Button variant="outline" size="sm" className="hidden sm:flex">
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Reviews</p>
//                 <p className="text-3xl font-bold text-gray-900">{totalReviews}</p>
//               </div>
//               <div className="p-3 bg-blue-50 rounded-lg">
//                 <MessageSquare className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Approved</p>
//                 <p className="text-3xl font-bold text-green-600">{approvedReviews}</p>
//               </div>
//               <div className="p-3 bg-green-50 rounded-lg">
//                 <CheckCircle className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending</p>
//                 <p className="text-3xl font-bold text-yellow-600">{pendingReviews}</p>
//               </div>
//               <div className="p-3 bg-yellow-50 rounded-lg">
//                 <XCircle className="h-6 w-6 text-yellow-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Avg Rating</p>
//                 <p className="text-3xl font-bold text-purple-600">{averageRating.toFixed(1)}</p>
//               </div>
//               <div className="p-3 bg-purple-50 rounded-lg">
//                 <Star className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search and Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Search & Filters</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//             {/* Search */}
//             <div className="lg:col-span-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search reviews, products, customers..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             {/* Rating Filter */}
//             <div>
//               <Select value={ratingFilter} onValueChange={setRatingFilter}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="All Ratings" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Ratings</SelectItem>
//                   <SelectItem value="5">5 Stars</SelectItem>
//                   <SelectItem value="4">4 Stars</SelectItem>
//                   <SelectItem value="3">3 Stars</SelectItem>
//                   <SelectItem value="2">2 Stars</SelectItem>
//                   <SelectItem value="1">1 Star</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Approval Filter */}
//             <div>
//               <Select value={approvalFilter} onValueChange={setApprovalFilter}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="All Reviews" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Reviews</SelectItem>
//                   <SelectItem value="approved">Approved</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Sort By */}
//             <div>
//               <Select value={sortBy} onValueChange={(value: 'date' | 'rating') => setSortBy(value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sort By" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="date">Newest First</SelectItem>
//                   <SelectItem value="rating">Highest Rating</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <Button variant="outline" onClick={resetFilters} className="flex items-center space-x-2">
//               <Filter className="h-4 w-4" />
//               <span>Reset Filters</span>
//             </Button>
//             <p className="text-sm text-gray-600">
//               Showing {paginatedReviews.length} of {filteredAndSortedReviews.length} reviews
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Reviews Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>All Reviews</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Desktop Table */}
//           <div className="hidden lg:block border rounded-lg overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className="font-semibold">Product</TableHead>
//                   <TableHead className="font-semibold">Rating</TableHead>
//                   <TableHead className="font-semibold">Customer</TableHead>
//                   <TableHead className="font-semibold">Date</TableHead>
//                   <TableHead className="font-semibold">Review</TableHead>
//                   <TableHead className="font-semibold text-center">Approval</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {paginatedReviews.map((review) => (
//                   <TableRow key={review.id} className="hover:bg-gray-50">
//                     <TableCell>
//                       <div className="flex items-center space-x-3">
//                         <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
//                           <img
//                             src={review.productImage}
//                             alt={review.productTitle}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                           <p className="font-medium text-gray-900 line-clamp-2">
//                             {review.productTitle}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             ID: {review.productId}
//                           </p>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center space-x-1">
//                         {renderStars(review.rating)}
//                         <span className="text-sm text-gray-600 ml-2">
//                           ({review.rating})
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div>
//                         <p className="font-medium text-gray-900">{review.customerName}</p>
//                         <p className="text-sm text-gray-500">{review.customerEmail}</p>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {format(new Date(review.reviewDate), 'MMM dd, yyyy')}
//                     </TableCell>
//                     <TableCell className="max-w-xs">
//                       <p className="text-sm text-gray-900 line-clamp-3">
//                         {review.reviewText}
//                       </p>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <div className="flex items-center justify-center space-x-2">
//                         <Switch
//                           checked={review.isApproved}
//                           onCheckedChange={() => toggleApproval(review.id)}
//                         />
//                         <Badge className={review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
//                           {review.isApproved ? 'Approved' : 'Pending'}
//                         </Badge>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-4">
//             {paginatedReviews.map((review) => (
//               <Card key={review.id} className="p-4">
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
//                       <img
//                         src={review.productImage}
//                         alt={review.productTitle}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-lg line-clamp-2">{review.productTitle}</h3>
//                       <div className="flex items-center space-x-1 mt-1">
//                         {renderStars(review.rating)}
//                         <span className="text-sm text-gray-600 ml-2">
//                           ({review.rating})
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Switch
//                         checked={review.isApproved}
//                         onCheckedChange={() => toggleApproval(review.id)}
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-600">Customer</p>
//                       <p className="font-medium">{review.customerName}</p>
//                       <p className="text-gray-500">{review.customerEmail}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Date</p>
//                       <p className="font-medium">{format(new Date(review.reviewDate), 'MMM dd, yyyy')}</p>
//                     </div>
//                   </div>
                  
//                   <div className="text-sm">
//                     <p className="text-gray-600 mb-2">Review</p>
//                     <p className="text-gray-900">{review.reviewText}</p>
//                   </div>
                  
//                   <div className="flex items-center justify-between pt-2 border-t">
//                     <Badge className={review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
//                       {review.isApproved ? 'Approved' : 'Pending'}
//                     </Badge>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {filteredAndSortedReviews.length === 0 && (
//             <div className="text-center py-12">
//               <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500">No reviews found matching your criteria.</p>
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-center space-x-2 mt-6">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </Button>
              
//               <div className="flex items-center space-x-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNumber;
//                   if (totalPages <= 5) {
//                     pageNumber = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNumber = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNumber = totalPages - 4 + i;
//                   } else {
//                     pageNumber = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <Button
//                       key={pageNumber}
//                       variant={currentPage === pageNumber ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setCurrentPage(pageNumber)}
//                       className="w-8 h-8 p-0"
//                     >
//                       {pageNumber}
//                     </Button>
//                   );
//                 })}
//               </div>
              
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

type ApiReview = {
  id: string;
  rating: number;
  review: string;
  reviewCreatedAt: string;
  verified: boolean;
  reviewBy?: { id: string; username: string | null; email: string | null } | null;
  productReviews: {
    product: { id: string; title: string | null; slug: string | null; image?: string | null } | null;
  }[];
};

type RowReview = {
  id: string;
  productId: string;
  productTitle: string;
  productImage?: string | null;
  rating: number;
  customerName: string;
  customerEmail: string;
  reviewDate: string;
  reviewText: string;
  isApproved: boolean;
};

// Mock reviews data
// const initialReviews = [
//   {
//     id: '1',
//     productId: 'PROD-001',
//     productTitle: 'Premium Wireless Headphones',
//     productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 5,
//     customerName: 'John Doe',
//     customerEmail: 'john.doe@email.com',
//     reviewDate: '2024-01-15T10:30:00Z',
//     reviewText: 'Absolutely amazing headphones! The sound quality is incredible and the noise cancellation works perfectly. Highly recommend for anyone looking for premium audio experience.',
//     isApproved: true,
//   },
//   {
//     id: '2',
//     productId: 'PROD-002',
//     productTitle: 'Organic Face Moisturizer',
//     productImage: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 4,
//     customerName: 'Jane Smith',
//     customerEmail: 'jane.smith@email.com',
//     reviewDate: '2024-01-14T15:45:00Z',
//     reviewText: 'Great moisturizer for sensitive skin. It absorbs quickly and doesn\'t leave any greasy residue. The only downside is the price, but the quality justifies it.',
//     isApproved: false,
//   },
//   {
//     id: '3',
//     productId: 'PROD-003',
//     productTitle: 'Smart Fitness Tracker Watch',
//     productImage: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 3,
//     customerName: 'Bob Johnson',
//     customerEmail: 'bob.johnson@email.com',
//     reviewDate: '2024-01-13T09:15:00Z',
//     reviewText: 'The fitness tracker is okay. Battery life is good and it tracks steps accurately, but the heart rate monitor seems inconsistent. Could be better for the price.',
//     isApproved: true,
//   },
//   {
//     id: '4',
//     productId: 'PROD-004',
//     productTitle: 'Eco-Friendly Yoga Mat',
//     productImage: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 5,
//     customerName: 'Alice Brown',
//     customerEmail: 'alice.brown@email.com',
//     reviewDate: '2024-01-12T14:20:00Z',
//     reviewText: 'Perfect yoga mat! Great grip, comfortable thickness, and I love that it\'s eco-friendly. The material feels premium and it\'s easy to clean. Will definitely buy again.',
//     isApproved: true,
//   },
//   {
//     id: '5',
//     productId: 'PROD-005',
//     productTitle: 'Gourmet Coffee Beans',
//     productImage: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 2,
//     customerName: 'Charlie Wilson',
//     customerEmail: 'charlie.wilson@email.com',
//     reviewDate: '2024-01-11T11:30:00Z',
//     reviewText: 'Expected much better quality for the price. The coffee tastes burnt and lacks the rich flavor described. Packaging was nice but the product itself was disappointing.',
//     isApproved: false,
//   },
//   {
//     id: '6',
//     productId: 'PROD-006',
//     productTitle: 'Luxury Silk Scarf',
//     productImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
//     rating: 4,
//     customerName: 'Diana Martinez',
//     customerEmail: 'diana.martinez@email.com',
//     reviewDate: '2024-01-10T16:45:00Z',
//     reviewText: 'Beautiful scarf with excellent quality silk. The colors are vibrant and the pattern is elegant. Slightly smaller than expected but still very satisfied with the purchase.',
//     isApproved: true,
//   },
// ];


export default function ReviewManagementPage() {
  const [rawReviews, setRawReviews] = useState<ApiReview[]>([]);
  const [reviews, setReviews] = useState<RowReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load reviews");
      const data: ApiReview[] = await res.json();
      setRawReviews(data);
      setReviews(mapToRows(data));
    } catch (e: any) {
      toast.error(e.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const mapToRows = (items: ApiReview[]): RowReview[] =>
    items.map((r) => {
      const firstProduct = r.productReviews?.[0]?.product || null;
      return {
        id: r.id,
        productId: firstProduct?.id || "-",
        productTitle: firstProduct?.title || "Unknown Product",
        productImage: (firstProduct as any)?.image || undefined, // adjust if your Product has images array
        rating: r.rating ?? 0,
        customerName: r.reviewBy?.username || "Unknown",
        customerEmail: r.reviewBy?.email || "",
        reviewDate: r.reviewCreatedAt,
        reviewText: r.review,
        isApproved: r.verified,
      };
    });

  const approveReview = async (id: string, nextValue: boolean) => {
    const dismiss = toast.loading(nextValue ? "Approving..." : "Marking pending...");
    // optimistic UI
    setReviews((prev) =>
      prev.map((rv) => (rv.id === id ? { ...rv, isApproved: nextValue } : rv))
    );
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: nextValue }),
      });
      if (!res.ok) throw new Error("Failed to update review");
      toast.success(nextValue ? "Review approved" : "Review set to pending", { id: dismiss });
    } catch (e: any) {
      // rollback on error
      setReviews((prev) =>
        prev.map((rv) => (rv.id === id ? { ...rv, isApproved: !nextValue } : rv))
      );
      toast.error(e.message || "Failed to update review", { id: dismiss });
    }
  };

  const deleteReview = async (id: string) => {
    const confirm = window.confirm("Delete this review?");
    if (!confirm) return;
    const dismiss = toast.loading("Deleting review...");
    const prev = reviews;
    // optimistic remove
    setReviews((prevList) => prevList.filter((r) => r.id !== id));
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete review");
      toast.success("Review deleted", { id: dismiss });
    } catch (e: any) {
      setReviews(prev); // rollback if failed
      toast.error(e.message || "Failed to delete review", { id: dismiss });
    }
  };

  // Filter + sort (kept from your original)
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter((review) => {
      const matchesSearch =
        searchTerm === "" ||
        review.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter;

      const matchesApproval =
        approvalFilter === "all" ||
        (approvalFilter === "approved" && review.isApproved) ||
        (approvalFilter === "pending" && !review.isApproved);

      return matchesSearch && matchesRating && matchesApproval;
    });

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
      } else {
        return b.rating - a.rating;
      }
    });

    return filtered;
  }, [reviews, searchTerm, ratingFilter, approvalFilter, sortBy]);

  // Pagination (kept from your original)
  const totalPages = Math.ceil(filteredAndSortedReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredAndSortedReviews.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));

  const resetFilters = () => {
    setSearchTerm("");
    setRatingFilter("all");
    setApprovalFilter("all");
    setSortBy("date");
    setCurrentPage(1);
  };

  // CSV Export of currently filtered rows
  const exportCsv = () => {
    const rows = filteredAndSortedReviews;
    const header = [
      "id",
      "productId",
      "productTitle",
      "rating",
      "customerName",
      "customerEmail",
      "reviewDate",
      "reviewText",
      "isApproved",
    ];
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [
          r.id,
          r.productId,
          JSON.stringify(r.productTitle),
          r.rating,
          JSON.stringify(r.customerName),
          r.customerEmail,
          r.reviewDate,
          JSON.stringify(r.reviewText),
          r.isApproved ? "approved" : "pending",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reviews-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter((r) => r.isApproved).length;
  const pendingReviews = reviews.filter((r) => !r.isApproved).length;
  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600 mt-2">Manage customer reviews and ratings for products.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{loading ? "—" : totalReviews}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{loading ? "—" : approvedReviews}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{loading ? "—" : pendingReviews}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <XCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-3xl font-bold text-purple-600">
                  {loading ? "—" : averageRating.toFixed(1)}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reviews, products, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Approval Filter */}
            <div>
              <Select value={approvalFilter} onValueChange={setApprovalFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Reviews" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <Select
                value={sortBy}
                onValueChange={(value: "date" | "rating") => setSortBy(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" onClick={resetFilters} className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Reset Filters</span>
            </Button>
            <p className="text-sm text-gray-600">
              Showing {paginatedReviews.length} of {filteredAndSortedReviews.length} reviews
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">Rating</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Review</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                      Loading reviews…
                    </TableCell>
                  </TableRow>
                ) : paginatedReviews.length ? (
                  paginatedReviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            {review.productImage ? (
                              <img
                                src={review.productImage}
                                alt={review.productTitle}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 line-clamp-2">
                              {review.productTitle}
                            </p>
                            <p className="text-sm text-gray-500">ID: {review.productId}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600 ml-2">({review.rating})</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{review.customerName}</p>
                          <p className="text-sm text-gray-500">{review.customerEmail}</p>
                        </div>
                      </TableCell>

                      <TableCell>{format(new Date(review.reviewDate), "MMM dd, yyyy")}</TableCell>

                      <TableCell className="max-w-xs">
                        <p className="text-sm text-gray-900 line-clamp-3">{review.reviewText}</p>
                      </TableCell>

                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Badge
                            className={
                              review.isApproved
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {review.isApproved ? "Approved" : "Pending"}
                          </Badge>
                          <Button
                            size="icon"
                            variant="outline"
                            title={review.isApproved ? "Mark Pending" : "Approve"}
                            onClick={() => approveReview(review.id, !review.isApproved)}
                          >
                            {review.isApproved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            title="Delete"
                            onClick={() => deleteReview(review.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                      No reviews found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {loading ? (
              <Card className="p-6 text-center text-gray-500">Loading reviews…</Card>
            ) : paginatedReviews.length ? (
              paginatedReviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {review.productImage ? (
                          <img
                            src={review.productImage}
                            alt={review.productTitle}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg line-clamp-2">{review.productTitle}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600 ml-2">({review.rating})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => approveReview(review.id, !review.isApproved)}
                        >
                          {review.isApproved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => deleteReview(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Customer</p>
                        <p className="font-medium">{review.customerName}</p>
                        <p className="text-gray-500">{review.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium">
                          {format(new Date(review.reviewDate), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-gray-600 mb-2">Review</p>
                      <p className="text-gray-900">{review.reviewText}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <Badge
                        className={
                          review.isApproved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {review.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center text-gray-500">No reviews found</Card>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) pageNumber = i + 1;
                  else if (currentPage <= 3) pageNumber = i + 1;
                  else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + i;
                  else pageNumber = currentPage - 2 + i;

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
