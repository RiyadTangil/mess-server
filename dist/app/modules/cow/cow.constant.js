"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowFilterableFields = exports.cowSearchableFields = exports.bloodGroup = exports.categories = exports.label = exports.breed = exports.location = void 0;
exports.location = [
    'Dhaka',
    'Chattogram',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymensingh',
];
exports.breed = [
    'Dhaka',
    'Brahman',
    'Nellore',
    'Sahiwal',
    'Gir',
    'Indigenous',
    'Tharparkar',
    'Kankrej',
];
exports.label = ['for sale', 'sold out'];
exports.categories = ['Dairy', 'Beef', 'Dual Purpose'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.cowSearchableFields = [
    'location',
    'breed',
    'label',
    'category',
    'name',
];
exports.cowFilterableFields = [
    'searchTerm',
    'location',
    'price',
    'maxPrice',
    'minPrice',
];
