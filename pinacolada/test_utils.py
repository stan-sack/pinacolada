import unittest

import utils

class TestTimeStamps(unittest.TestCase):

    def test_timestamps(self):
        for s in utils.time_stamps('201706092312', 1):
            self.assertEqual(s, '201706092318')
        
        # new day and hour
        for s in utils.time_stamps('201706092354', 1):
            self.assertEqual(s, '201706100000')

        # new month
        for s in utils.time_stamps('201705312354', 1):
            self.assertEqual(s, '201706010000')

        # New year
        for s in utils.time_stamps('201712312354', 1):
            self.assertEqual(s, '201801010000')

        # XXX Leap year
        for s in utils.time_stamps('202002282354', 1):
            self.assertEqual(s, '202002290000')
        
        for s in utils.time_stamps('201902282354', 1):
            self.assertEqual(s, '201903010000')
        
    
    def test_get_time_stamp(self):
        self.assertEqual(utils.get_time_stamp('processed/IDR714.T.201706090812.png'), '201706090812')


if __name__ == '__main__':
    unittest.main()
