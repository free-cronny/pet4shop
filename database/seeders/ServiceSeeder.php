<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'user_id' => 1,
                'name' => 'Service 1',
                'description' => 'Description of service 1',
                'price' => 100.00,
                'duration' => 60,
                'status' => 'active',
            ],
            [
                'user_id' => 1,
                'name' => 'Service 2',
                'description' => 'Description of service 2',
                'price' => 200.00,
                'duration' => 120,
                'status' => 'active',
            ],
            [
                'user_id' => 1,
                'name' => 'Service 3',
                'description' => 'Description of service 3',
                'price' => 300.00,
                'duration' => 180,
                'status' => 'active',
            ],
        ];

        foreach ($services as $service) {
            \App\Models\Service::create($service);
        }
    }
}
