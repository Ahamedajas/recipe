import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();

  switch (req.method) {
    case 'POST':
      try {
        const { recipeId, recipeName, imageUrl } = req.body;

        const result = await db.collection('favorite_recipes').insertOne({
          recipeId,
          recipeName,
          imageUrl,
        });

        res.status(201).json({ message: 'Recipe added to favorites!' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to add recipe to favorites.' });
      }
      break;

    case 'GET':
      try {
        const favorites = await db
          .collection('favorite_recipes')
          .find({})
          .toArray();

        res.status(200).json(favorites);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites.' });
      }
      break;

    case 'DELETE':
      try {
        const { recipeId } = req.body;

        const result = await db
          .collection('favorite_recipes')
          .deleteOne({ recipeId });

        if (result.deletedCount === 0) {
          res.status(404).json({ error: 'Recipe not found in favorites.' });
        } else {
          res.status(200).json({ message: 'Recipe removed from favorites!' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to remove recipe from favorites.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
