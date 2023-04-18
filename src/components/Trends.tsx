import { Component, For, createEffect, createResource, createSignal } from 'solid-js';

const random = () => Math.floor(Math.random() * 500);
const trends = [
  { category: "Sports", content: "World Cup news", count: random() * 10 },
  { category: "Finance", content: "Bitcoin rises again!", count: random()*4 },
  { category: "Politics", content: "Negotiation failed", count: random() },
  { category: "Banking", content: "Bank collapse", count: random()*7 },
  { category: "Celebrities", content: "useless news", count: random()*15 },
  { category: "Economy", content: "Inflation continues", count: random()*3 },
];

const Trends: Component = () => {

  return (
    <div class="bg-gray-800 overflow-hidden flex-it rounded-2xl">
      <div class="flex-it p-4">
        <span class="text-xl font-bold">Trends</span>
      </div>

      <For each={trends}>
        {(trend) =>
          <div class="flex-it p-4 cursor-pointer transition duration-200 hover:bg-gray-700">
            <div class="flex-it">
              <span class="text-gray-400 text-sm">
                {trend.content}
              </span>
              <span class="text-lg font-bold">{trend.category}</span>
              <span class="text-gray-400 text-sm">{trend.count} glides</span>
            </div>
          </div>
        }
      </For>
    </div>)
}//{JSON.stringify(trends)}

export default Trends;